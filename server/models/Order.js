const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderCode: {
            type: String,
            required: true,
            unique: true,
        },

        // User who placed the order
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Post being purchased or Post Id
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },

        // Selected option
        selectedOption: {
            type: String,
        },

        // Quantity
        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },

        // Post price at purchase time
        price: {
            type: Number,
            required: true,
        },

        // Final amount
        totalAmount: {
            type: Number,
            required: true,
        },

        // Order status
        status: {
            type: String,
            enum: ["pending", "confirmed", "failed", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;