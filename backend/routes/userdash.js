const express = require('express');
const router = express.Router();

// Import the orderController
const orderController = require('../controller/userdash');

// Route for fetching an order by userId and orderId


router.get('/orders/:userId', orderController.getOrdersByUserId);



module.exports = router;
