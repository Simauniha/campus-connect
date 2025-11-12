const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');

// Create a post
router.post('/create', postController.createPost);

// Get all posts
router.get('/', postController.getPosts);

module.exports = router;
