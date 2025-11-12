const Review = require('../models/review');

// Create a new review
const createReview = async (req, res) => {
    try {
        const { productId, userName, review } = req.body;

        if (!productId || !review) {
            return res.status(400).json({ message: 'Product ID and review are required.' });
        }

        const newReview = new Review({
            productId,
            userName, // Optional
            review
        });

        await newReview.save();
        res.status(201).json({ message: 'Review created successfully!', review: newReview });
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({ message: 'Failed to create review.' });
    }
};



const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        // Fetch reviews without populate
        const reviews = await Review.find({ productId });

        res.status(200).json(reviews);

    } catch (err) {
        console.error('Error fetching product reviews:', err);
        res.status(500).json({ message: 'Failed to fetch reviews.' });
    }
};



// Delete a review
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        res.status(200).json({ message: 'Review deleted successfully!' });
    } catch (err) {
        console.error('Error deleting review:', err);
        res.status(500).json({ message: 'Failed to delete review.' });
    }
};



module.exports = { createReview, getProductReviews, deleteReview, };
