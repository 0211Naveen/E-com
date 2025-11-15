

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
const cartRoutes = require("./routes/cart");


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

app.use("/cart", cartRoutes);


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















// local ----



// // server.js
// require("dotenv").config();                     // <-- load .env first
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// // ---------- ROUTES ----------
// const productRoutes   = require("./routes/addproducts");
// const cartRoutes      = require("./routes/cart");
// const CustomerModel   = require("./routes/register");
// const loginModel      = require("./routes/login");
// const orderModel      = require("./routes/order");
// const userdash        = require("./routes/userdash");
// const reviewcont      = require("./routes/review");
// const bannerRoutes    = require("./routes/banner");
// const adminRoutes     = require("./routes/admin");
// const storeRoutes     = require("./routes/storeadmin");
// const Admincustomers  = require("./models/Customer");

// const app = express();

// // ---------- MIDDLEWARE ----------
// app.use(express.json());

// app.use(
//   cors({
//     origin: [
//       "https://e-com-olive-rho.vercel.app", // production front-end
//       "http://localhost:3000",               // local dev
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// app.options("*", cors()); // pre-flight

// // static folders
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/bannerimages", express.static(path.join(__dirname, "bannerimages")));

// // ---------- DB ----------
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB error:", err));

// // ---------- ROUTES ----------
// app.use("/addproducts", productRoutes);
// app.use("/cart", cartRoutes);

// // Register / Delete
// app.post("/register", CustomerModel);
// app.delete("/customers/:id", CustomerModel);

// // Login
// app.post("/login", loginModel);

// // Admin – customers
// app.get("/Admincustomers", async (req, res) => {
//   try {
//     const data = await Admincustomers.find();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/count", async (req, res) => {
//   try {
//     const count = await Admincustomers.countDocuments();
//     res.json({ count });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Orders
// app.post("/orders", orderModel);
// app.get("/orders", orderModel);
// app.get("/orders/delivered", orderModel);
// app.put("/orders/:id", orderModel);
// app.get("/countorders", orderModel);
// app.get("/orders/:userId", userdash);

// // Reviews
// app.post("/review", reviewcont);
// app.get("/review/:productId", reviewcont);
// app.delete("/review/:id", reviewcont);

// // Banners
// app.post("/bannerimg", bannerRoutes);
// app.get("/bannerimg", bannerRoutes);
// app.delete("/bannerimg/:id", bannerRoutes);

// // Admin login / register
// app.post("/adminregister", adminRoutes);
// app.post("/adminlogin", adminRoutes);

// // Store admin
// app.post("/storeregister", storeRoutes);
// app.post("/storelogin", storeRoutes);

// // ---------- PRIVILEGES ----------
// const privilegeSchema = new mongoose.Schema({
//   section: { type: String, required: true },
//   status: { type: Boolean, default: false },
// });
// const Privilege = mongoose.model("Privilege", privilegeSchema);

// app.post("/updateStatus", async (req, res) => {
//   const { section, status } = req.body;
//   try {
//     let priv = await Privilege.findOne({ section });
//     if (priv) {
//       priv.status = status;
//       await priv.save();
//     } else {
//       priv = new Privilege({ section, status });
//       await priv.save();
//     }
//     res.json({ message: "Status updated", privilege: priv });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.get("/getPrivileges", async (req, res) => {
//   try {
//     const list = await Privilege.find({ status: true });
//     res.json({ privileges: list });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ---------- ROOT ----------
// app.get("/", (req, res) => {
//   res.send("Backend Server Running!");
// });

// const PORT = process.env.PORT || 3001; // fallback if .env missing
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on port ${PORT}`);
// });
// // ---------- EXPORT for Vercel ----------
// module.exports = app;