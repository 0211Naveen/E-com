// routes/cart.js
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// ADD / UPDATE CART
router.post("/", async (req, res) => {
  try {
    const { userId, product } = req.body;

    if (!userId || !product?._id) {
      return res.status(400).json({ error: "Missing userId or product" });
    }

    const existing = await Cart.findOne({ userId, productId: product._id });

    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return res.json({ message: "Quantity updated", cartItem: existing });
    }

    const newCart = new Cart({
      userId,
      productId: product._id,
      pname: product.pname,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    await newCart.save();
    res.json({ message: "Item added to cart", cartItem: newCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET USER CART
router.get("/:userId", async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.params.userId });
    res.json(items);
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
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    await Wishlist.findOneAndDelete({ userId, productId });

    res.json({ message: "Removed successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET CART COUNT (number of unique items)
router.get("/count/:userId", async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.params.userId });
    const count = items.length;  // ← Just the number of documents
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
