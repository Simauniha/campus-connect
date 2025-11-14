const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../Controllers/postController');
const authMiddleware = require('../Middleware/authMiddleware');

// Public route to get all posts
router.get('/', getAllPosts);

// Protected route to create a post
router.post('/', authMiddleware, createPost);

module.exports = router;
