

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerInfo: {
        name: String,
        phone: String,
        address: String,
        pincode: String
    },
    cart: [
        {
            pname: String,
            quantity: Number,
            price: Number
        }
    ],
    totalPrice: Number,
    paymentDetails: Object,
    userId: String,
    status: { 
        type: String, 
        enum: ['Ordered', 'Packed', 'Shipped', 'Delivered'], 
        default: 'Ordered'  
    }
}, { timestamps: true });  // ✅ This adds `createdAt` and `updatedAt`

module.exports = mongoose.model('Order', orderSchema);
