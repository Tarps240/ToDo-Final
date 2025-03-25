// server/index.js

// Load enviroment variables
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require ('cookie-parser');
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.js');
const todoRoutes = require( './routes/todos.js');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/todos', todoRoutes);

// Connect to MongoDB and Start the server.
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if connection fails.
    });