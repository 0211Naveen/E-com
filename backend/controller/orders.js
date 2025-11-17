
const Order = require('../models/orders');


exports.saveOrder = async (req, res) => {
    try {
        const { customerInfo, cart, totalPrice, paymentDetails , userId} = req.body;

        const newOrder = new Order({
            customerInfo,
            cart,
            totalPrice,
            paymentDetails,
            userId
        });

        await newOrder.save();
        res.json({ message: 'Order saved successfully!' });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Failed to save order' });
    }
};



exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: { $in: ["Ordered", "Packed", "Shipped"] } });  
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};







exports.getOrderCount = async (req, res) => {
    try {
        const count = await Order.countDocuments({});
        res.json({ count });
    } catch (error) {
        console.error('Error counting orders:', error);
        res.status(500).json({ message: 'Failed to retrieve order count' });
    }
};


// controllers/ordersController.js
exports.getUserConfirmedOrders = async (req, res) => {
    const userId = req.params.userId; // Get the userId from the route params

    try {
        const userOrders = await Order.find({ customerId: userId, status: 'Confirmed' });
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user orders', error });
    }
};
