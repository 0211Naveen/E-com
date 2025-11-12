// routes/storeRoutes.js
const express = require('express');
const { registerStore,loginStore} = require('../controller/storeadmin');
const router = express.Router();

router.post('/storeregister', registerStore);

router.post('/storelogin', loginStore);


module.exports = router;
