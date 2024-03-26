const reactionModel = require('./../src/models/reactions_md');
const jwt = require('jsonwebtoken');

// exports.createReaction = async (req, res) => {
//   try {
//     const reaction = await reactionModel.findOne({
//       authorId: info.id,
//       postId: req.params.id,
//     });

//     let newReaction;

//     if (!reaction) {
//       const payload = {
//         authorId: info.id,
//         postId: req.params.id,
//         like: req.body.like,
//         dislike: req.body.dislike,
//       };
//       newReaction = await reactionModel.create(payload);

//       return res.send({
//         message: 'Reaction Successfully Created',
//         data: newReaction,
//       });
//     } else {
//       if (
//         (req.body.like && reaction.like) ||
//         (req.body.dislike && reaction.dislike)
//       ) {
//         newReaction = await reactionModel.findByIdAndDelete(reaction._id);

//         return res.send({
//           message: 'Reaction Successfully Deleted',
//           data: newReaction,
//         });
//       } else {
//         await reactionModel.findByIdAndUpdate(reaction._id, req.body);

//         const post = await postModel.findById(req.body.id).lean();

//         return res.send({
//           message: 'Reaction Successfully Updated',
//           data: post,
//         });
//       }
//     }
//   } catch (err) {
//     res.status(500).json({ error: true, message: err.messasge });
//   }
// };

exports.createReaction = (req, res) => {
  const { User_token } = req.cookies;
  try {
    jwt.verify(User_token, process.env.USER_SECRET, {}, async (err, info) => {
      if (err) return res.send({ message: 'Could not create a reaction' });
      reactionModel
        .findOne({ authorId: info.id, postId: req.params.id })
        .then((user) => {
          if (!user) {
            const payload = {
              authorId: info.id,
              postId: req.params.id,
              like: req.body.like,
              dislike: req.body.dislike,
            };
            reactionModel.create(payload).then((user) => {
              res.send({
                message: 'Reaction Successfully Created',
                data: user,
              });
            });
          } else {
            if (
              (req.body.like && user.like) ||
              (req.body.dislike && user.dislike)
            ) {
              reactionModel.findByIdAndDelete(user._id).then((data) => {
                res.send({ message: 'Reaction Successfully Deleted', data });
              });
            } else {
              reactionModel.findByIdAndUpdate(user._id, req.body).then(() => {
                postModel
                  .findById(req.body.id)
                  .lean()
                  .then((user) => {
                    res.send({
                      message: 'Reaction Successfully Updated',
                      data: user,
                    });
                  });
              });
            }
          }
        });
    });
  } catch (err) {
    res.send({ error: true, message: err.messasge });
  }
};

exports.getLikes = async (req, res) => {
  try {
    const reaction = await reactionModel
      .find({ postId: req.params.id, like: true })
      .count();
    res.status(200).json(reaction);
  } catch (err) {
    res.status(500).json({ error: true, message: err.messasge });
  }
};

// exports.getLikes = (req, res) => {
//   reactionModel
//     .find({ postId: req.params.id, like: true })
//     .count()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.send({ error: true, message: err.message });
//     });
// };

exports.getUnlike = async (req, res) => {
  try {
    const reaction = await reactionModel
      .find({ postId: req.params.id, dislike: true })
      .count();
    res.status(200).json(reaction);
  } catch (err) {
    res.status(500).json({ error: true, message: err.messasge });
  }
};

// exports.getUnlike = (req, res) => {
//   reactionModel
//     .find({ postId: req.params.id, dislike: true })
//     .count()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.send({ error: true, message: err.message });
//     });
// };
