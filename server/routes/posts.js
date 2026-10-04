const express = require('express');
const router = express.Router();
const { createPost, readPosts, singleUserPosts,singlePost, updatePost, deletePost } = require('../controller/postsController.js');
const { protect } = require('../middleware/auth.js');




router.post('/createpost', protect, createPost);
router.get('/getallposts', readPosts);
router.get('/getsingleuserposts',protect, singleUserPosts);
router.get('/singlePostView/:id',protect, singlePost);
router.put('/updatepost/:id', protect, updatePost);
router.delete('/deletepost/:id', protect, deletePost);

module.exports = router;