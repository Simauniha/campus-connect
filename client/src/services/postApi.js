import axios from 'axios';

const postApi = axios.create({
    baseURL: 'http://localhost:8000/api/posts',  // note /api/posts here!
    headers: { 'Content-Type': 'application/json' },
});

postApi.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default postApi;
