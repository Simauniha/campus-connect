import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/posts');

        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <div>
      <h2 className="mb-4">Campus Posts</h2>

      {posts.map(post => (
        <div key={post._id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>

            <p className="text-muted mb-0">
              Posted by <strong>{post?.author?.name || "Unknown"}</strong>
            </p>
            
            <small className="text-muted">
              {post.createdAt && new Date(post.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
