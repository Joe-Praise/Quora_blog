const postModel = require('../src/models/post_md');
const commentModel = require('../src/models/comments_md');
const reactionModel = require('../src/models/reactions_md');

const accumulatedPostsFunc = (posts, accumulatedReactions) => {
  // if accumulatedReactions is empty, return posts
  if (accumulatedReactions.length < 0) {
    return;
  }

  // make a copy of posts
  const postCopy = [...posts];

  // create an object to store reactions with post id as key
  const reactions = {};

  // loop through accumulatedReactions and add to reactions object
  for (let key of accumulatedReactions) {
    reactions[Object.keys(key)] = key;
  }

  // loop through postCopy and add likes and unlikes to each post
  for (let post of postCopy) {
    // check if post id is in reactions
    if (post._id in reactions) {
      // add likes and unlikes to post
      post.like = reactions[post._id][post._id][0];
      post.dislike = reactions[post._id][post._id][1];
    }
  }

  return postCopy;
};

const handleGetPosts = async (posts) => {
  // get all posts ids
  const postsId = posts.flatMap((post) => post._id);

  // get all reactions for those posts
  const reactions = await reactionModel
    .find({ postId: { $in: postsId } })
    .lean();

  // create an array to store accumulated reactions
  const accumulatedReactions = [];

  // loop through reactions and add to accumulatedReactions
  for (let i = 0; i < reactions.length; i++) {
    // get reaction each reaction
    const reaction = reactions[i];

    // create a cache object to store reactions
    const cache = {};

    // check if reaction post id is in cache
    if (reaction.postId in cache) {
      // check if reaction is like or dislike
      if (reaction.like) {
        // if like, increment like
        cache[reaction.postId][0]++;
      } else {
        // if dislike, increment dislike
        cache[reaction.postId][1]++;
      }

      // if post id is not in cache, add to cache
    } else {
      // add post id to cache with likes and unlikes set to 0
      cache[reaction.postId] = [0, 0];

      // check if reaction is like or dislike
      if (reaction.like) {
        // if like, increment like
        cache[reaction.postId][0]++;
      } else {
        // if dislike, increment dislike
        cache[reaction.postId][1]++;
      }
    }

    // add cache to accumulatedReactions
    accumulatedReactions.push(cache);
  }

  // get accumulated posts
  const accumulatedPosts = accumulatedPostsFunc(posts, accumulatedReactions);

  // return accumulated posts
  return accumulatedPosts;
};

exports.createPost = async (req, res) => {
  try {
    if (req.files.length > 0) {
      req.body.image = req.files[0].filename;
    }

    const { content, image, space } = req.body;
    const newPost = await postModel.create({
      content,
      image,
      space,
      authorId: req.user._id,
    });

    res
      .status(201)
      .json({ sucess: true, data: newPost, message: 'Post Created!' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    // get posts
    const posts = await postModel
      .find()
      .populate('authorId', ['name', 'image'])
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();

    // return accumulated posts with likes and unlikes of each posts
    const accumulatedPosts = await handleGetPosts(posts);

    res.json({ success: true, data: accumulatedPosts });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    const comments = await commentModel
      .find({ postId: req.params.id })
      .populate('authorId', ['image', 'name'])
      .sort({ createdAt: -1 })
      .lean();

    const likes = await reactionModel
      .find({ postId: req.params.id, like: true })
      .count();

    const dislikes = await reactionModel
      .find({ postId: req.params.id, dislike: true })
      .count();

    const payload = {
      postId: post._id,
      author: post.authorId,
      content: post.content,
      image: post.image,
      space: post.space,
      comments: [...comments],
      likes: likes,
      dislikes: dislikes,
      createdAt: post.createdAt,
    };
    res.json({ success: true, data: payload });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    if (req.files.length > 0) {
      req.body.image = req.files[0].filename;
    }
    const post = await postModel.findById(req.body.id);

    if (!post) {
      return res
        .status(404)
        .json({ message: 'The post does not exist', code: 404 });
    }

    let data = post._doc;
    post.overwrite({ ...data, ...req.body });
    post.save();

    res.status(200).json({
      success: true,
      message: 'Post Updated',
      data: post,
    });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  console.log(req);
  try {
    await postModel.deleteMany({ _id: req.params.id });

    await reactionModel.deleteMany({
      postId: req.params.id,
    });

    await commentModel.deleteMany({
      postId: req.params.id,
    });
    res.json({ success: true, message: 'Post Deleted' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};
