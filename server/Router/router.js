const express = require('express');

const router = express.Router();

// Test route
router.get('/', (req, res) => {
    res.send("Campus Connect API running...");
});

// Example placeholder routes
router.get('/posts', (req, res) => {
    res.json({ message: "Here will be posts list" });
});

router.get('/users', (req, res) => {
    res.json({ message: "Here will be users list" });
});

module.exports = router;
