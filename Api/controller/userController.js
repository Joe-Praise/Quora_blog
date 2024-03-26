const userModel = require('../src/models/user_md');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });

    user.password = undefined;

    return res
      .status(201)
      .json({ sucess: true, data: user, message: 'Account Created!' });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().lean();

    return res
      .status(200)
      .json({ success: true, results: users.length, data: users });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .select('-password')
      .lean();

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.messasge });
  }
};

exports.getRandomProfile = async (req, res) => {
  try {
    const user = await userModel.find(
      { _id: req.params.id },
      { password: false, lastLogin: false, updatedAt: false },
    );

    return res.status(200).json({ data: user });
  } catch (err) {
    res
      .status(500)
      .json({ error: ture, message: 'Could not find posts for this sapce' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.files.length > 0) {
      req.body.image = req.files[0].filename;
    }
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: 'The user does not exist!', code: 404 });
    }

    let data = user._doc;
    user.overwrite({ ...data, ...req.body });
    user.save();
    return res
      .status(200)
      .json({ success: true, message: 'User Updated!', data: user });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);

    await postModel.deleteMany({ authorId: req.params.id });

    await reactionModel.deleteMany({
      authorId: req.params.id,
    });

    await followingModel.deleteMany({
      follower: req.params.id,
    });

    await commentModel.deleteMany({
      authorId: req.params.id,
    });

    return res.json({ success: true, message: 'User Deleted' });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};
