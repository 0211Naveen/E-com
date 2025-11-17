// models/Wishlist.js
const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  pname: String,
  price: Number,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);

