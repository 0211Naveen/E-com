// controllers/storeController.js
const StoreModel = require('../models/storeadmin');
const bcrypt = require('bcrypt');

// Register new store
exports.registerStore = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingStore = await StoreModel.findOne({ email });
        if (existingStore) {
            return res.status(400).json({ message: 'Store already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStore = new StoreModel({ name, email, password: hashedPassword, role });
        await newStore.save();
        res.status(201).json({ message: 'Store registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login store
exports.loginStore = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the store exists
        const store = await StoreModel.findOne({ email });
        if (!store) {
            return res.status(400).json({ status: "Error", message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, store.password);
        if (!isMatch) {
            return res.status(400).json({ status: "Error", message: 'Invalid credentials' });
        }

        // Respond with success and store data
        res.status(200).json({
            status: "Success",
            message: 'Login successful',
            user: {
                id: store._id,
                email: store.email,
                role: store.role // Example: Add role for privilege checks
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ status: "Error", message: 'Server error', error });
    }
};