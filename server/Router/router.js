const express = require('express');
const router = express.Router();

// Base test route
router.get('/', (req, res) => {
    res.send("Campus Connect API running...");
});

const authMiddleware = require('../Middleware/authMiddleware');

// Protected test route 
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is protected', user: req.user });
});

module.exports = router;
