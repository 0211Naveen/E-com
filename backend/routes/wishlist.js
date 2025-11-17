// routes/wishlist.js
const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// ADD TO WISHLIST
router.post("/", async (req, res) => {
  const { userId, product } = req.body;
  try {
    let item = await Wishlist.findOne({ userId, productId: product._id });
    if (item) return res.json({ message: "Already in wishlist" });

    item = new Wishlist({
      userId,
      productId: product._id,
      pname: product.pname,
      price: product.price,
      image: product.image,
    });
    await item.save();
    res.json({ message: "Added to wishlist", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET WISHLIST
router.get("/:userId", async (req, res) => {
  try {
    const items = await Wishlist.find({ userId: req.params.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REMOVE FROM WISHLIST
// router.delete("/:userId/:productId", async (req, res) => {
//   try {
//     await Wishlist.findOneAndDelete({
//       userId: req.params.userId,
//       productId: req.params.productId,
//     });
//     res.json({ message: "Removed" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// REMOVE FROM WISHLIST
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const deleted = await Wishlist.findOneAndDelete({
      userId: req.params.userId,
      productId: req.params.productId,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Item not found in wishlist" });
    }

    res.json(deleted); // Return the deleted item
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;