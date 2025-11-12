const express = require('express');
const cors = require('cors');
require('dotenv').config();
const DbConnect = require('./Config/dbConfig');

const app = express();

// Connect to MongoDB
DbConnect();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./Router/authRoutes'); // Auth routes
const mainRouter = require('./Router/router');     // Base router

app.use('/api/auth', authRoutes); // /api/auth/register & /api/auth/login
app.use('/api', mainRouter);      // Other API routes

// Test route
app.get('/', (req, res) => res.send('Campus Connect API running...'));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
