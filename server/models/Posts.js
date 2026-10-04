const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            default: 0,
        },

        // Premium or Free
        isPremium: {
            type: Boolean,
            default: false,
        },

        // Draft or Published
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },

        // Available hai ya nahi
        available: {
            type: Boolean,
            default: true,
        },

        // Stock
        stock: {
            type: Number,
            default: 0,
        },

        // Creator apni marzi se options add karega
        options: [
            {
                name: String,

                available: {
                    type: Boolean,
                    default: true,
                },
            },
        ],

        // Discount percentage
        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;