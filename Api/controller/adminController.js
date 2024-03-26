const userModel = require('../src/models/user_md');
const postModel = require('../src/models/post_md');
const reactionModel = require('../src/models/reactions_md');
const adminUserModel = require('../src/models/adminUser_md');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('./../src/config/jwt');

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.length < 0 && password.length < 0) {
      return;
    }

    const admin = await adminUserModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        msg: 'Email or password not correct. Do you have Authorization?',
      });
    }

    const passOk = bcrypt.compareSync(password, admin.password);

    if (!passOk) {
      return res.status(401).json({ msg: 'Email or password not correct' });
    }

    const token = jwt.sign(
      { name: admin.name, image: admin.image, id: admin._id },
      process.env.ADMIN_SECRET,
    );

    return res
      .cookie('Admin_token', token, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .json({ message: 'Admin credentials ok', redirect: '/' });

    // adminUserModel.findOne({ email }).then((user) => {
    //   const passOk = bcrypt.compareSync(password, user.password);
    //   if (passOk) {
    //     // logged in with json webtoken
    //     jwt.sign(
    //       {
    //         name: user.name,
    //         image: user.image,
    //         id: user._id,
    //         position: user.position,
    //       },
    //       process.env.ADMIN_SECRET,
    //       {},
    //       (err, token) => {
    //         if (err)
    //           return res.status(500).send({
    //             message: 'opps, something went wrong. Our bad!',
    //             redirect: '/adminlogout',
    //           });

    //         res
    //           .cookie('Admin_token', token, {
    //             sameSite: 'none',
    //             secure: true,
    //             httpOnly: true,
    //           })
    //           .json({ message: 'Admin credentials ok', redirect: '/admin' });
    //       },
    //     );
    //   } else {
    //     res.status(400).send({
    //       message: 'wrong admin credentials',
    //       redirect: '/adminlogout',
    //     });
    //   }
    // });
  } catch (err) {
    res.status(401).json({ error: true, message: err.message });
  }
};

exports.adminLogout = async (req, res) => {
  try {
    return res.clearCookie('Admin_token').json({ redirect: '/login' });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.messasge });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await adminUserModel
      .find({ _id: req.admin.id })
      .select('-password -lastLogin -createdAt -updatedAt');

    return res.status(200).json({ success: true, data: admin });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.messasge });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, position, department, address, phone } =
      req.body;

    if (email === password) {
      return res.status(200).json({
        error: true,
        message: 'Email and Password must be different!',
      });
    }
    const isAdminExisting = await adminUserModel.findOne({
      email: req.body.email,
    });
    if (isAdminExisting) {
      return res
        .status(200)
        .json({ error: true, message: 'Email already exists' });
    }

    await adminUserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
      position,
      department,
      address,
      phone,
    });

    return res.status(201).json({ sucess: true, message: 'Account Created!' });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.messasge });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const admins = await adminUserModel.find();
    return res
      .status(200)
      .json({ sucess: true, results: admins.length, data: admins });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.messasge });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminUserModel.findById(id);
    return res.status(200).json({ sucess: true, data: admin });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.messasge });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    if (req.files.length > 0) {
      req.body.image = req.files[0].filename;
    }

    const admin = await adminUserModel.findById(req.admin.id);
    if (!admin) {
      return res
        .status(404)
        .json({ message: 'The admin does not exist!', code: 404 });
    }

    let data = admin._doc;
    admin.overwrite({ ...data, ...req.body });
    admin.save();

    res.status(200).json({
      success: true,
      message: 'Admin Updated!',
      data: admin,
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.messasge });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    await adminUserModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Admin Deleted!',
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.messasge });
  }
};

exports.getTotalUsers = (req, res) => {
  userModel
    .find()
    .count()
    .then((num) => {
      res.send({ data: num, message: 'Total No. Of Users' });
    })
    .catch((err) => {
      console.log(err);
      return res.send({ error: true, message: err.message });
    });
};

exports.getTotalPosts = (req, res) => {
  postModel
    .find()
    .count()
    .then((num) => {
      res.send({ data: num, message: 'Total No. Of Posts' });
    })
    .catch((err) => {
      console.log(err);
      return res.send({ error: true, message: err.message });
    });
};

exports.getTotalLikes = (req, res) => {
  reactionModel
    .find({ like: true })
    .count()
    .then((data) => {
      res.send({ data: data, message: 'Total No. Of Likes' });
    });
};

exports.getTotalDislikes = (req, res) => {
  reactionModel
    .find({ dislike: true })
    .count()
    .then((data) => {
      res.send({ data: data, message: 'Total No. Of Dislikes' });
    });
};
