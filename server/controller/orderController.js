const User = require('../models/User');
const Post = require('../models/Posts');
const Order = require('../models/Order')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.createOrder = async (req, res) => {
    try {
        //user id and data get from frontend for creating order
        const userId = req.user._id;
        const {
            postId,
            selectedOption,
            quantity,
        } = req.body;

        if (!userId) {
            res.status(401).json({ message: 'User Not Found' });
        }
        //quantity must be at least 1
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }
        // post find by id
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: 'Post Not Found' });
        }
        // Variables
        let finalPrice = post.price;
        let selectedOptionData = null;

        if (selectedOption) {
            selectedOptionData = post.options.find((option) => option.name === selectedOption);

            // Option exist nahi karta
            if (!selectedOptionData) {
                return res.status(400).json({
                    message: "Selected option not found"
                });
            }
            // Option available nahi hai
            if (!selectedOptionData.available) {
                return res.status(400).json({
                    message: "Selected option is not available"
                });
            }
            finalPrice = selectedOptionData.price;
        }

        const totalAmount = finalPrice * quantity;

        const newOrder = await Order.create({
            orderCode: "ORD-" + Date.now(),
            userId,
            postId,
            quantity,
            selectedOption,
            totalAmount,
            price: finalPrice,
            status: "pending"
        });
        res.status(201).json({
            message: "Order Created Succesfully",
            newOrder
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err: err.message });
    }
}

//for only single users can seen our orders
exports.viewOrders = async (req, res) => {
    try {
        const userId = req.user_.id;
        const orders = await Order.find({
            userId: userId
        })
            .populate("postId", "title price")
            .sort({ createdAt: -1 })
        return res.status(200).json({
            message: "My Orders",
            orders
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}

//for admin shows which user buy which product
exports.viewOrdersAdmin = async (req, res) => {
    try {
        const allOrders = await Order.find()
            .populate("userId", "name email")
            .populate("postId", "title price")
            .sort({ createdAt: -1 });
        return res.status(200).json({
            message: "All Orders",
            allOrders
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}

//Update Order by user

exports.updateOrder = async (req, res) => {
    try {
        // Logged-in user ki ID
        const userId = req.user._id;

        const {
            selectedOption,
            quantity
        } = req.body;

        // User check
        if (!userId) {
            return res.status(401).json({
                message: "User Not Found"
            });
        }

        // Quantity check
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        // Pehle existing order find karo
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        // Check karo ki ye order isi logged-in user ka hai
        if (order.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You cannot update this order"
            });
        }

        // Existing order se postId milega
        const post = await Post.findById(order.postId);

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found"
            });
        }

        // Default post price
        let finalPrice = post.price;

        // Agar option select kiya hai
        if (selectedOption) {

            const selectedOptionData = post.options.find(
                (option) => option.name === selectedOption
            );

            // Option exist nahi karta
            if (!selectedOptionData) {
                return res.status(400).json({
                    message: "Selected option not found"
                });
            }

            // Option available nahi hai
            if (!selectedOptionData.available) {
                return res.status(400).json({
                    message: "Selected option is not available"
                });
            }

            // Selected option ka price
            finalPrice = selectedOptionData.price;
        }

        // Price × Quantity
        const totalAmount = finalPrice * quantity;

        // Existing Order UPDATE
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                selectedOption,
                quantity,
                price: finalPrice,
                totalAmount
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            message: "Order Updated Successfully",
            updatedOrder
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
};


//Update Status By Admin

exports.adminStatus = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body;
        // Allowed statuses
        const allowedStatus = [
            "pending",
            "confirmed",
            "cancelled"
        ];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }
        const order = await Order.findById(orderId);
        order.status = status;
        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}
