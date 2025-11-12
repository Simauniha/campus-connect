const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

// Base test route
router.get('/', (req, res) => {
    res.send("Campus Connect API running...");
});

// Attach auth routes
router.use('/auth', authRoutes);

// Placeholder routes (for future)
router.get('/posts', (req, res) => {
    res.json({ message: "Here will be posts list" });
});

router.get('/users', (req, res) => {
    res.json({ message: "Here will be users list" });
});

const authMiddleware = require('../Middleware/authMiddleware');

router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is protected', user: req.user });
});

module.exports = router;
