// src/pages/Posts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Posts = () => {
    const [posts, setPosts] = useState([]); // ✅ Initialize as array

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:8000/api/posts', {
                headers: { Authorization: `Bearer ${token}` },
            });

            // ✅ Ensure response is an array
            if (Array.isArray(res.data)) {
                setPosts(res.data);
            } else if (Array.isArray(res.data.posts)) {
                setPosts(res.data.posts);
            } else {
                setPosts([]);
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to fetch posts', 'error');
        }
    };

    return (
        <div>
            <h2 className="mb-3">📢 Posts Feed</h2>
            {posts.length === 0 ? (
                <p>No posts available yet.</p>
            ) : (
                posts.map((post) => (
                    <div className="card mb-3 shadow-sm" key={post._id}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.content}</p>
                            <small className="text-muted">
                                Posted by {post.author?.name || 'Anonymous'}
                            </small>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Posts;
