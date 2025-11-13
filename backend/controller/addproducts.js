
const productsModel = require('../models/addproducts');

const addproducts = async (req, res) => {
    try {
        const { pname, price, desc } = req.body; // Extracting product name and price from the request body
        const imagePath = req.file ? req.file.path : ''; // Get the uploaded image path

        const newProduct = new productsModel({
            pname,
            price,
            desc,
            image: imagePath, // Save the image path to the database
        });

        const savedProduct = await newProduct.save(); // Save the product to the database
        res.status(201).json({ message: "Product added successfully", product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product", error });
    }
};



// const getProducts = (req, res) => {
//     productsModel.find()
//         .then(products => {
//             const updatedProducts = products.map(product => ({
//                 ...product._doc,
//                 image: product.image, // If image stores just the filename like 'image.jpg'
//             }));
//             res.json(updatedProducts);
//         })
//         .catch(err => res.status(400).json({ error: err.message }));
// };

const getProducts = (req, res) => {
    productsModel.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json({ error: err.message }));
};


module.exports = { addproducts, getProducts};