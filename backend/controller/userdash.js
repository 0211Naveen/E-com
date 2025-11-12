

const Order = require('../models/orders');

// // Controller to fetch orders for the logged-in user
// exports.getOrdersByUserId = async (req, res) => {
//     try {
//         const { userId } = req.params; // Extract userId from request parameters

//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required.' });
//         }

//         // Fetch orders for the specific user
//         const orders = await Order.find({ userId }).sort({ createdAt: -1 });

//         if (!orders.length) {
//             return res.status(404).json({ message: 'No orders found for this user.' });
//         }

//         res.status(200).json(orders);
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({ message: 'Failed to fetch user orders.' });
//     }
// };



// Controller to fetch orders for the logged-in user
// exports.getOrdersByUserId = async (req, res) => {
//     try {
//         const { userId } = req.params; // Extract userId from request parameters

//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required.' });
//         }

//         // Fetch orders for the specific user
//         const orders = await Order.find({ userId }).sort({ createdAt: -1 });

//         if (!orders.length) {
//             return res.status(404).json({ message: 'No orders found for this user.' });
//         }

//         // Enhance the response to include delivered date if the order is delivered
//         const updatedOrders = orders.map(order => ({
//             ...order._doc,  // Spread existing order details
//             deliveredDate: order.status === "Delivered" ? order.updatedAt : null // Include delivered date
//         }));

//         res.status(200).json(updatedOrders);
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({ message: 'Failed to fetch user orders.' });
//     }
// };


// Controller to fetch orders for the logged-in user
exports.getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params; 

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        // Fetch orders and include customer details
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        // Add `deliveredDate` if order status is "Delivered"
        const updatedOrders = orders.map(order => ({
            ...order._doc,
            deliveredDate: order.status === "Delivered" ? order.updatedAt : null
        }));

        res.status(200).json(updatedOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch user orders.' });
    }
};
