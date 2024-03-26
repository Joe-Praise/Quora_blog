const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  getProfile,
} = require('./../../controller/appController');
const { Protect } = require('../../controller/authController');

router.post('/login', login);

router.post('/logout', logout);

router.get('/profile', Protect, getProfile);

module.exports = router;
