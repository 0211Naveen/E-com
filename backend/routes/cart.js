// const express = require("express");
// const router = express.Router();
// const Cart = require("../models/cart");

// // ADD TO CART
// router.post("/", async (req, res) => {
//   try {
//     const { userId, product } = req.body;

//     // check if product already exists in cart
//     let existing = await Cart.findOne({ userId, productId: product._id });

//     if (existing) {
//       existing.quantity += 1;
//       await existing.save();
//       return res.json({ message: "Quantity updated" });
//     }

//     // new cart entry
//     const newCart = new Cart({
//       userId,
//       productId: product._id,
//       productName: product.pname,
//       price: product.price,
//       image: product.image,
//       quantity: 1
//     });

//     await newCart.save();
//     res.json({ message: "Item added to cart" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET ALL CART ITEMS OF USER
// router.get("/:userId", async (req, res) => {
//   try {
//     const cartItems = await Cart.find({ userId: req.params.userId });
//     res.json(cartItems);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // UPDATE QUANTITY
// router.put("/update/:id", async (req, res) => {
//   try {
//     const updated = await Cart.findByIdAndUpdate(
//       req.params.id,
//       { quantity: req.body.quantity },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE ITEM
// router.delete("/remove/:id", async (req, res) => {
//   try {
//     await Cart.findByIdAndDelete(req.params.id);
//     res.json({ message: "Item removed" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


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
router.delete("/remove/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET CART COUNT ONLY (lightweight)
router.get("/count/:userId", async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.params.userId });
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
