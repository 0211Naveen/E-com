
// const loginModel = require('../models/Customer');

// // Login a customer
// exports.loginCustomer = (req, res) => {
//     const { email, password } = req.body;

//     loginModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 if (user.password === password) {
//                     // Include user ID and name in the response if login is successful
//                     res.json({
//                         status: "Success",
//                         user: {
//                             userId: user._id,
//                             name: user.name
//                         }
//                     });
//                 } else {
//                     res.json({ status: "Error", message: "The password is incorrect" });
//                 }
//             } else {
//                 res.json({ status: "Error", message: "No record existed" });
//             }
//         })
//         .catch(err => {
//             console.error("Login error:", err);
//             res.status(500).json({ status: "Error", message: "Server error" });
//         });
// };


const loginModel = require('../models/Customer');

const bcrypt = require('bcryptjs');

// Login a customer
exports.loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Check if user exists
        const user = await loginModel.findOne({ email: email });
        if (!user) {
            return res.json({ status: "Error", message: "No record existed" });
        }

        // ✅ Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ status: "Error", message: "The password is incorrect" });
        }

        // ✅ Successful login
        res.json({
            status: "Success",
            user: {
                userId: user._id,
                name: user.name
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ status: "Error", message: "Server error" });
    }
};
