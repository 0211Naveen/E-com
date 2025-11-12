const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
;

// Register Admin
const registerAdmin = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, email, password: hashedPassword, role });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin' });
    }
};




// const loginAdmin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const admin = await Admin.findOne({ email });
//         if (!admin) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

       

//         res.status(200).json({
//             message: 'Login successful',
//             user: { id: admin._id, email: admin.email, role: admin.role },
           
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Server error. Please try again later.' });
//     }
// };

// Admin Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ status: "Error", message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ status: "Error", message: 'Invalid email or password' });
        }


        // Respond with token and user info
        res.status(200).json({
            status: "Success",
            message: 'Login successful',
            user: {
                id: admin._id,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ status: "Error", message: 'Server error. Please try again later.' });
    }
};
module.exports = {
    registerAdmin,
    loginAdmin
};
