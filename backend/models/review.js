

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            index: true, // Index for faster queries
        },
        userName: {
            type: String,
            required: true, // Store user name as a plain string
            trim: true,
        },
        review: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, 
    }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
