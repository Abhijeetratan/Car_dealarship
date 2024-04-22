// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const dealershipRoutes = require('./routes/dealershipRoutes');
const cors = require('cors');


require('dotenv').config();

// Create Express app
const app = express();
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/cars', carRoutes);
app.use('/users', userRoutes);
app.use('/dealerships', dealershipRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle database connection errors
db.on('error', err => {
    console.error('Database connection error:', err);
});
