const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    pname: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
