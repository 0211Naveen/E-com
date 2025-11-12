const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { addproducts, getProducts } = require('../controller/addproducts'); 

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads'); 
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //timestamp to the filename
    }
});

// Initialize multer
const upload = multer({ storage: storage });

// Route to handle POST request to add products with image upload
router.post('/addproducts', upload.single('image'), addproducts);

// Route to handle GET request to fetch products
router.get('/addproducts', getProducts);


//  // Add this route for fetching by ID
//  router.get('/addproducts/:id', getProductById); 



module.exports = router;
