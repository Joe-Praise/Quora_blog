const express = require('express');
const upload = require('../config/multer');
const {
  adminLogin,
  adminLogout,
  getAdminProfile,
  createAdmin,
  getAllAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getTotalUsers,
  getTotalPosts,
  getTotalLikes,
  getTotalDislikes,
} = require('../../controller/adminController');
const { ProtectAdmin } = require('../../controller/authController');

const router = express.Router();

router.post('/adminlogin', adminLogin);

router.post('/adminlogout', adminLogout);

router.get('/admin-profile', ProtectAdmin, getAdminProfile);

// ADMIN USER

// create user
router.post('/create-admin', createAdmin);

// get Admin Users
router.get('/users', ProtectAdmin, getAllAdmin);

// get particular Admin
router.get('/user/:id', ProtectAdmin, getAdmin);

// update user
router.post('/update-user', ProtectAdmin, upload.any(), updateAdmin);

// delete user
router.delete('/delete-user/:id', ProtectAdmin, deleteAdmin);

router.get('/user-count', getTotalUsers);

router.get('/post-count', getTotalPosts);

router.get('/likes-count', getTotalLikes);

router.get('/dislikes-count', getTotalDislikes);

module.exports = router;
