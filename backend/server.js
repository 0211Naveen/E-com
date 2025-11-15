// const dotenv = require("dotenv");
// const express = require("express");
// const mongoose = require('mongoose');
// const cors = require("cors");
// const path = require("path");
// const productsModel = require("./routes/addproducts");
// const CustomerModel = require("./routes/register");
// const loginModel = require("./routes/login");
// const Product = require("./models/addproducts");
// const Admincustomers = require('./models/Customer');
// const orderModel = require('./routes/order');
// const userdash = require('./routes/userdash');
// const reviewcont = require('./routes/review');
// const bannerRoutes = require('./routes/banner');
// const adminRoutes = require('./routes/admin');
// const storeRoutes = require('./routes/storeadmin');
// dotenv.config();

// require("dotenv").config();




// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// // Serve static files from `bannerimages` directory
// app.use('/bannerimages', express.static(path.join(__dirname, 'bannerimages')));

// // MongoDB connection

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected successfully"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));


// // user side routs


// // display products customers
// app.get('/addproducts', productsModel);

// // Register
// app.post('/register', CustomerModel);

// app.delete('/customers/:id', CustomerModel)

// // Login
// app.post('/login', loginModel);

// // Get product by ID
// app.get('/addproducts/:id', async (req, res) => {
//     try {
//         const productId = req.params.id;

//         if (!productId || !mongoose.isValidObjectId(productId)) {
//             return res.status(400).json({ message: 'Invalid Product ID' });
//         }

//         const product = await Product.findById(productId); // Use Product model here

//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.json(product);
//     } catch (error) {
//         console.error('Error fetching product:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // admin side 

// // Get all customers
// app.get('/Admincustomers', async (req, res) => {
//     Admincustomers.find()
//         .then(data => res.json(data))
//         .catch(err => res.status(500).json({ error: err.message }));
// });

// // Count all customers
// app.get('/count', async (req, res) => {
//     try {
//         const customerCount = await Admincustomers.countDocuments(); // Get the count of documents
//         res.json({ count: customerCount });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // edit produtcs in admin
// app.put('/addproducts/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedProduct = req.body;

//         const result = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
//         if (!result) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.json({ message: 'Product updated successfully', product: result });
//     } catch (error) {
//         console.error('Error updating product:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


// // delete produtcs in admin
// app.delete('/addproducts/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         const result = await Product.findByIdAndDelete(id); // Find and delete the product by ID
//         if (!result) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.json({ message: 'Product deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting product:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });



// // add products
// app.post("/addproducts", productsModel);

// // post orders
// app.post('/orders', orderModel);


// // get orders 
// app.get('/orders', orderModel);

// // get delivered orders 
// app.get('/orders/delivered', orderModel);

// // update and confirm orders
// app.put('/orders/:id', orderModel);

// // count orders
// app.get('/countorders', orderModel);

// // user side
// app.get('/orders/:userId', userdash);




// // review
// // post review
// app.post('/review', reviewcont);

// // get review
// app.get('/review/:productId', reviewcont);

// // delete review
// app.delete('/review/:id', reviewcont);

// // dynamic image banner

// // post banner 
// app.post('/bannerimg', bannerRoutes);

// // get banner
// app.get('/bannerimg', bannerRoutes);

// // delete banner
// app.delete('/bannerimg/:id', bannerRoutes);


// // admin 
// // admin login
// app.post('/adminregister', adminRoutes);
// // admin login
// app.post('/adminlogin', adminRoutes);

// // store admin
// // register
// app.post('/storeregister', storeRoutes);
// // login
// app.post('/storelogin', storeRoutes);




// // privileges




// // Define a schema for the privileges
// const privilegeSchema = new mongoose.Schema({
//     section: { type: String, required: true },
//     status: { type: Boolean, default: false },
// });



// // Create a model from the schema
// const Privilege = mongoose.model('Privilege', privilegeSchema);


// // API endpoint to update the status of a privilege
// app.post('/updateStatus', async (req, res) => {
//     const { section, status } = req.body;

//     try {
//         // Check if the section already exists in the database
//         let privilege = await Privilege.findOne({ section });

//         if (privilege) {
//             // If it exists, update the status
//             privilege.status = status;
//             await privilege.save();
//         } else {
//             // If it doesn't exist, create a new entry
//             privilege = new Privilege({
//                 section,
//                 status,
//             });
//             await privilege.save();
//         }

//         // Respond with a success message
//         res.status(200).json({ message: 'Status updated successfully', privilege });
//     } catch (error) {
//         console.error('Error updating status', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });




// // API endpoint to get all privileges

// app.get('/getPrivileges', async (req, res) => {
//     console.log('getPrivileges called');
//     try {
//         const privileges = await Privilege.find({ status: true });
//         res.status(200).json({ privileges });
//     } catch (error) {
//         console.error('Error fetching privileges', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });





// // Server port
// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const dotenv = require("dotenv");
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");


const productRoutes = require("./routes/addproducts");


const CustomerModel = require("./routes/register");
const loginModel = require("./routes/login");
const Admincustomers = require('./models/Customer');
const orderModel = require('./routes/order');
const userdash = require('./routes/userdash');
const reviewcont = require('./routes/review');
const bannerRoutes = require('./routes/banner');
const adminRoutes = require('./routes/admin');
const storeRoutes = require('./routes/storeadmin');
dotenv.config();

require("dotenv").config();



// ✅ CORS FIX — Allow frontend requests from your Vercel domain


const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "https://e-com-olive-rho.vercel.app", // your frontend live URL
    "http://localhost:3000" // optional: for local testing
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.options('*', cors());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Serve static files from `bannerimages` directory
app.use('/bannerimages', express.static(path.join(__dirname, 'bannerimages')));

// // MongoDB connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));



// user side routs


app.use("/addproducts", productRoutes);



// Register
app.post('/register', CustomerModel);

app.delete('/customers/:id', CustomerModel)

// Login
app.post('/login', loginModel);




// admin side 

// Get all customers
app.get('/Admincustomers', async (req, res) => {
    Admincustomers.find()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Count all customers
app.get('/count', async (req, res) => {
    try {
        const customerCount = await Admincustomers.countDocuments(); // Get the count of documents
        res.json({ count: customerCount });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






// post orders
app.post('/orders', orderModel);


// get orders 
app.get('/orders', orderModel);

// get delivered orders 
app.get('/orders/delivered', orderModel);

// update and confirm orders
app.put('/orders/:id', orderModel);

// count orders
app.get('/countorders', orderModel);

// user side
app.get('/orders/:userId', userdash);


// review
// post review
app.post('/review', reviewcont);

// get review
app.get('/review/:productId', reviewcont);

// delete review
app.delete('/review/:id', reviewcont);

// dynamic image banner

// post banner 
app.post('/bannerimg', bannerRoutes);

// get banner
app.get('/bannerimg', bannerRoutes);

// delete banner
app.delete('/bannerimg/:id', bannerRoutes);


// admin 
// admin login
app.post('/adminregister', adminRoutes);
// admin login
app.post('/adminlogin', adminRoutes);

// store admin
// register
app.post('/storeregister', storeRoutes);
// login
app.post('/storelogin', storeRoutes);




// privileges




// Define a schema for the privileges
const privilegeSchema = new mongoose.Schema({
    section: { type: String, required: true },
    status: { type: Boolean, default: false },
});



// Create a model from the schema
const Privilege = mongoose.model('Privilege', privilegeSchema);


// API endpoint to update the status of a privilege
app.post('/updateStatus', async (req, res) => {
    const { section, status } = req.body;

    try {
        // Check if the section already exists in the database
        let privilege = await Privilege.findOne({ section });

        if (privilege) {
            // If it exists, update the status
            privilege.status = status;
            await privilege.save();
        } else {
            // If it doesn't exist, create a new entry
            privilege = new Privilege({
                section,
                status,
            });
            await privilege.save();
        }

        // Respond with a success message
        res.status(200).json({ message: 'Status updated successfully', privilege });
    } catch (error) {
        console.error('Error updating status', error);
        res.status(500).json({ message: 'Server error' });
    }
});




// API endpoint to get all privileges

app.get('/getPrivileges', async (req, res) => {
    console.log('getPrivileges called');
    try {
        const privileges = await Privilege.find({ status: true });
        res.status(200).json({ privileges });
    } catch (error) {
        console.error('Error fetching privileges', error);
        res.status(500).json({ message: 'Server error' });
    }
});





// Server port

// const PORT = process.env.PORT || 3001; // fallback if .env missing
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on port ${PORT}`);
// });

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Backend Server Running Successfully!");
});

module.exports = app;
