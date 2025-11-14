const Post = require('../Models/PostModel');

// Create a post
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.create({
            title,
            content,
            author: req.user.id, // comes from auth middleware
        });

        await post.populate('author', 'name email'); // include author info
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name email') // populate author info
            .sort({ createdAt: -1 }); // latest posts first

        res.status(200).json(posts); // return array of posts
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
