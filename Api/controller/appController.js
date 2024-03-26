const userModel = require('./../src/models/user_md');
const bcrypt = require('bcryptjs');
const jwt = require('./../src/config/jwt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.length < 0 && password.length < 0) {
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Email or password not correct' });
    }
    const passOk = bcrypt.compareSync(password, user.password);
    if (!passOk) {
      return res.status(401).json({ msg: 'Email or password not correct' });
    }
    const token = jwt.sign(
      { name: user.name, image: user.image, id: user._id },
      process.env.USER_SECRET,
    );

    return res
      .cookie('User_token', token, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .json({ message: 'User credentials ok', redirect: '/', token });
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'wrong credentials', redirect: '/login' });
  }
};

exports.logout = async (req, res) => {
  try {
    return res
      .clearCookie('User_token')
      .status(202)
      .json({ redirect: '/login' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // const { User_token } = req.cookies;

    // if (User_token === undefined) {
    //   res.json({ err: 'Login to have access!', redirect: '/login' });
    // } else {
    //   jwt.verify(User_token, process.env.USER_SECRET, {}, (err, info) => {
    //     if (err) res.status(401).json({ err: err, redirect: '/login' });
    //     userModel
    //       .find(
    //         { _id: info.id },
    //         { name: true, image: true, _id: true, email: true },
    //       )
    //       .then((data) => {
    //         res.json(data);
    //       });
    //   });
    // }

    const user = await userModel
      .findById(req.user._id)
      .select('-password')
      .lean();

    if (!user) {
      return res
        .status(404)
        .json({ error: true, message: 'User not found', redirect: '/login' });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(401).json({ error: true, message: err.message });
  }
};
