import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/posts'); // backend route: /api/posts
                setPosts(res.data);
            } catch (err) {
                console.error('Error fetching posts:', err.response?.data?.message || err.message);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Posts Feed</h2>
            {posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">{post.user.name}</h5>
                            <p className="card-text">{post.content}</p>
                            <p className="text-muted">Likes: {post.likes.length}</p>
                            <p className="text-muted">Comments: {post.comments.length}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Posts;
