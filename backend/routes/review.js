const express = require('express');
const router = express.Router();
const { createReview, getProductReviews, deleteReview } = require('../controller/review');

// Route to add a new review
router.post('/review', createReview);

// Route to get all reviews for a specific product
router.get('/review/:productId', getProductReviews);

// Route to delete a review
router.delete('/review/:id', deleteReview);


module.exports = router;
