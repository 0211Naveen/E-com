const express = require('express');
const router = express.Router();
const { registerCustomer,deleteCustomer } = require('../controller/register');

// Register route
router.post('/register', registerCustomer);

// Route to delete a customer by ID
router.delete('/customers/:id',deleteCustomer);

module.exports = router;
