const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// ADD TO CART
router.post("/", async (req, res) => {
  try {
    const { userId, product } = req.body;

    // check if product already exists in cart
    let existing = await Cart.findOne({ userId, productId: product._id });

    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return res.json({ message: "Quantity updated" });
    }

    // new cart entry
    const newCart = new Cart({
      userId,
      productId: product._id,
      productName: product.pname,
      price: product.price,
      image: product.image,
      quantity: 1
    });

    await newCart.save();
    res.json({ message: "Item added to cart" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL CART ITEMS OF USER
router.get("/:userId", async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE QUANTITY
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE ITEM
router.delete("/remove/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
