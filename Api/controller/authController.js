const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const userModel = require('../src/models/user_md');
const adminModel = require('../src/models/adminUser_md');

exports.Protect = async (req, res, next) => {
  // 1) getting token and check if it's there
  const { User_token } = req.cookies;

  if (!User_token) {
    return res
      .status(401)
      .json({ msg: 'You are not logged in! Please log in to get access.' });
  }

  //   verify token
  const decoded = await promisify(jwt.verify)(
    User_token,
    process.env.USER_SECRET,
  );

  //   check if user still exists
  const currentUser = await userModel.findById(decoded.id);

  if (!currentUser) {
    return res
      .status(401)
      .json({ msg: 'The user belonging to this token does not exist.' });
  }

  req.user = currentUser;
  next();

  // let token;

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   token = req.headers.authorization.split(' ')[1];
  // }

  // console.log(token);

  // if (!token) {
  //   return res
  //     .status(401)
  //     .json({ msg: 'You are not logged in! Please log in to get access.' });
  // }
  // // 2) Verifiying token
  // // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // const decoded = await promisify(jwt.verify)(token, process.env.USER_SECRET);

  // // 3) Check if user still exists
  // const currentUser = await userModel.findById(decoded.id);
  // if (!currentUser) {
  //   return res
  //     .status(401)
  //     .json({ msg: 'The user belonging to this token does not exist.' });
  // }

  // // GRANT ACCESS TO PROTECTED ROUTE
  // req.user = currentUser;

  // next();
};

exports.ProtectAdmin = async (req, res, next) => {
  // 1) getting token and check if it's there
  //   let cookies;
  const { Admin_token } = req.cookies;

  if (!Admin_token) {
    return res.status(401).json({
      message: 'You are not Authorized! Please log in to get access.',
      redirect: '/adminlogin',
    });
  }

  //   verify token
  const decoded = await promisify(jwt.verify)(
    Admin_token,
    process.env.ADMIN_SECRET,
  );

  //   check if user still exists
  const currentUser = await adminModel.findById(decoded.id);

  if (!currentUser) {
    return res.status(401).json({ msg: 'You are not Authorized!. Nice try!' });
  }

  req.admin = currentUser;
  next();
};
