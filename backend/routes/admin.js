const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controller/admin');

// Register Route
router.post('/adminregister', registerAdmin);

// Login Route
router.post('/adminlogin', loginAdmin);

module.exports = router;
