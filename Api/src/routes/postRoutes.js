const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require('../../controller/postController');
const { Protect } = require('../../controller/authController');

//POST
// create post
router.post('/create-post', Protect, upload.any(), createPost);

// get posts
router.get('/posts', getAllPosts);

// get post
router.get('/post/:id', getPost);

// update post
router.post('/update-post', Protect, upload.any(), updatePost);

// delete post
router.delete('/delete-post/:id', Protect, deletePost);

module.exports = router;
