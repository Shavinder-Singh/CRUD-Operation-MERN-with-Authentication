const express = require('express');
const router = express.Router();
const { createPost, readPosts, singleUserPosts,singlePost, updatePost, deletePost } = require('../controller/postsController.js');
const { protect } = require('../middleware/auth.js');




router.post('/createpost', protect, createPost);//done
router.get('/getallposts', readPosts);//done
router.get('/getsingleuserposts',protect, singleUserPosts);//done
router.get('/singlepostview/:id',protect, singlePost);//done
router.put('/updatepost/:id', protect, updatePost);//done
router.delete('/deletepost/:id', protect, deletePost);//done

module.exports = router;