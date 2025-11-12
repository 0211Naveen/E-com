const mongoose = require('mongoose');

const addproductsSchema = new mongoose.Schema({
    pname: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    desc: {
        type: String, 
        required: true 
    },
    image: { 
        type: String,
        required: true
    }
    
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create and export the model
const productsModel = mongoose.model("addproducts", addproductsSchema);

module.exports = productsModel;
