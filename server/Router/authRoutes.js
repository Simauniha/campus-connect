const express = require('express');
const router = express.Router();

const { registerUser, loginUser} = require('../Controllers/authController');

const authMiddleware = require('../Middleware/authMiddleware');


router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
