const User = require('../models/User');
const Post = require('../models/Posts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.createPost = async (req, res) => {
    try {
        const { title, description, price, isPremium, status, available, stock, options, discount } = req.body;
        const { post } = await Post.create({
            title, description, price, isPremium, status, available, stock, options, discount,
            createdBy: req.user._id
        });
        res.status(201).json({
            message: "Post Created Succesfully",
            post
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err: err.message });
    }
}


// Read All Posts of all users

exports.readPosts = async (req, res) => {
    const posts = await Post.find({ status: "published" }).populate("createdBy", "name email");
    try {
        res.status(201).json({
            message: "All Users Posts Fetched Succesfully",
            posts
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err: err.message });
    }
}



// Single user (All posts)

exports.singleUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ createdBy: req.user._id });
        res.status(201).json({
            message: "User Post fetched Succesfully",
            posts
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err: err.message });
    }
}


//Update Post

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(500).json({ message: 'Post Not Found' });
        }
        //get from frontend        
        const { title, description, price, isPremium, status, available, stock, options, discount } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title, description, price, isPremium, status, available, stock, options, discount
            },
            { new: true }
        );
        res.status(201).json({
            message: "Post Update Succesfully",
            updatedPost
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err: err.message });
    }
}



// Single Post View All Users
exports.singlePost = async (req, res) => {
    try {

        const singlePost = await Post.findById(req.params.id);

        if (!singlePost) {
            return res.status(404).json({
                message: "Post Not Found"
            });
        }

        res.status(200).json({
            message: "View Your Post Now",
            singlePost
        });

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err: err.message
        });
    }
};



//Delete Post

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(500).json({ message: 'Post Not Found' });
        }
        await Post.findByIdAndDelete(req.params.id);
        res.status(201).json({
            message: "Post Delete Succesfully",
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err: err.message });
    }
}