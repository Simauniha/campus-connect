import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/')
      .then(res => setMessage(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Campus Connect Home</h1>
      <p>{message}</p>
    </div>
  );
};

export default Home;
