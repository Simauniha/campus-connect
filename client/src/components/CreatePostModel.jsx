import React, { useState } from 'react';
import axios from 'axios';

const CreatePostModel = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:8000/api/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle('');
      setContent('');

      // Call parent callback
      onPostCreated(res.data.post);

      // Close modal safely
      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById('createPostModal')
      );
      modal.hide();

      alert('Post created successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    }
  };

  return (
    <div className="modal fade" id="createPostModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Create Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input 
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <textarea
                className="form-control"
                placeholder="Content"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModel;
