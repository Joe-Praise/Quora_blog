const commentModel = require('./../src/models/comments_md');
const postModel = require('./../src/models/post_md');
const jwt = require('./../src/config/jwt');
const { findById } = require('../src/models/user_md');

exports.createComment = async (req, res) => {
  try {
    const isPostExisting = await postModel.findById(req.params.id);

    if (!isPostExisting) {
      return res.status(200).json({
        error: true,
        message: 'Post does not exist! Try an existing post',
      });
    }

    const payload = {
      authorId: req.user._id,
      postId: req.params.id,
      content: req.body.content,
    };
    const data = new commentModel(payload);
    await data.save();
    console.log(data);
    return res.json({ success: true, message: 'Comment created!', data });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

exports.getComment = async (req, res) => {
  try {
    const comments = await commentModel
      .find({ postId: req.params.id })
      .populate('authorId', ['image', 'name'])
      .sort({ createdAt: -1 });

    if (!comments) {
      return res.status(404).json({ message: 'The comment does not exist' });
    }

    return res
      .status(200)
      .json({ results: comments.length, success: true, data: comments });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.deleteComment = (req, res) => {
  commentModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.send({ success: true, message: 'Comment Deleted' });
    })
    .catch((err) => {
      res.send({ error: true, message: err.message });
    });
};
