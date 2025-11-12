// routes/order.js 

const express = require('express');
const router = express.Router();
const orderController = require('../controller/orders');
const Order = require('../models/orders');


// post order
router.post('/orders', orderController.saveOrder);

// get order
router.get('/orders', orderController.getOrders);

// order count
router.get('/countorders', orderController.getOrderCount);

// Fetch confirmed orders for a specific user by their ID
router.get('/orders/user/:userId', orderController.getUserConfirmedOrders);


module.exports = router;



// Route to fetch only Delivered orders
router.get('/orders/delivered', async (req, res) => {
    try {
        const deliveredOrders = await Order.find({ status: 'Delivered' });
        res.json(deliveredOrders);
    } catch (error) {
        console.error('Error fetching delivered orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Update order status
router.put('/orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['Ordered', 'Packed', 'Shipped', 'Delivered'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Find order and update status
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } // Return the updated order
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
});

module.exports = router;