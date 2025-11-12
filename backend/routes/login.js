const express = require('express');
const router = express.Router();
const { loginCustomer } = require('../controller/login');


// Login route
router.post('/login', loginCustomer);





module.exports = router;
