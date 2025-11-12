// const CustomerModel = require('../models/Customer');

// // Register a new customer
// exports.registerCustomer = async (req, res) => {
//     CustomerModel.create(req.body)
//     .then(employees => res.json(employees))
//     .catch(err => res.json(err))

// };

const CustomerModel = require('../models/Customer');
const bcrypt = require('bcryptjs');

// Register a new customer
exports.registerCustomer = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ Check if user already exists
        const existingUser = await CustomerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create new user with hashed password
        const newUser = new CustomerModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "Customer registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const deletedCustomer = await CustomerModel.findByIdAndDelete(customerId);

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Failed to delete customer' });
    }
};