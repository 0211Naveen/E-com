const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// ➕ Add to Cart
router.post("/", async (req, res) => {
    try {
        const { userId, product } = req.body;

        let existing = await Cart.findOne({
            userId,
            productId: product._id
        });

        if (existing) {
            existing.quantity += 1;
            await existing.save();
            return res.json(existing);
        }

        const newItem = await Cart.create({
            userId,
            productId: product._id,
            pname: product.pname,
            price: product.price,
            image: product.image,
            quantity: 1
        });

        res.json(newItem);
    } catch (err) {
        res.status(500).json({ message: "Error adding to cart" });
    }
});

// 🛒 Get Cart Items by User
router.get("/:userId", async (req, res) => {
    const cart = await Cart.find({ userId: req.params.userId });
    res.json(cart);
});

// 🗑 Remove Item
router.delete("/:id", async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed" });
});

// 🔄 Update Quantity
router.put("/:id", async (req, res) => {
    const item = await Cart.findByIdAndUpdate(
        req.params.id,
        { quantity: req.body.quantity },
        { new: true }
    );
    res.json(item);
});

module.exports = router;
