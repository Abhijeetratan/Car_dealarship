const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');
const faker = require('faker');
const isAdmin = require('../middleware/isAdmin');
const bcrypt = require('bcrypt');



const usersDatabase = [];

// User registration route
router.post('/register/user', async (req, res) => {
    try {
        // Generate dummy data for user registration
        const userData = {
            user_email: faker.internet.email(),
            user_id: faker.random.uuid(),
            user_location: faker.address.city(),
            user_info: {
                name: faker.name.firstName(),
                age: faker.random.number({ min: 18, max: 80 }),
                phone: faker.phone.phoneNumber()
            },
            password: faker.internet.password(), // Generate random password
            vehicle_info: [] // Initialize empty array for vehicle info
        };

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        // Save user data to the usersDatabase array
        usersDatabase.push({
            user_email: userData.user_email,
            user_id: userData.user_id,
            user_location: userData.user_location,
            user_info: userData.user_info,
            password_hash: hashedPassword,
            vehicle_info: userData.vehicle_info
        });

        // Generate JWT token for the user
        const accessToken = jwt.sign({ userId: userData.user_id, email: userData.user_email }, process.env.JWT_SECRET);

        // Send the token and user data back to the client
        res.json({ accessToken: accessToken, user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User login route
router.post('/login/user', (req, res) => {
    // Here you would typically authenticate the user
    // For demonstration purposes, let's assume authentication is successful
    const user = {
        userId: faker.random.uuid(),
        email: req.body.email ,
        password:req.body.password// Assuming email is sent in the request body
    };

    // Generate JWT token for the user
    const accessToken = jwt.sign(user, process.env.JWT_SECRET);

    // Send the token back to the client
    res.json({ accessToken: accessToken });
});

// Dealership login route
router.post('/login/dealership', (req, res) => {
    // Here you would typically authenticate the dealership
    // For demonstration purposes, let's assume authentication is successful
    const dealership = {
        dealershipId: faker.random.uuid(),
        email: req.body.email, 
        password:req.body.password// Assuming email is sent in the request body
    };

    // Generate JWT token for the dealership
    const accessToken = jwt.sign(dealership, process.env.JWT_SECRET);

    // Send the token back to the client
    res.json({ accessToken: accessToken });
});

// Admin login route
router.post('/login/admin', (req, res) => {
    // Here you would typically authenticate the admin
    // For demonstration purposes, let's assume authentication is successful
    const admin = {
        adminId: faker.random.uuid(),
        email: req.body.email, // Assuming email is sent in the request body
        role: 'admin' // Adding a role property for admin
    };

    // Generate JWT token for the admin
    const accessToken = jwt.sign(admin, process.env.JWT_SECRET);

    // Send the token back to the client
    res.json({ accessToken: accessToken });
});

// Token validation route
router.post('/validate-token', authenticateToken, (req, res) => {
    // If the middleware authenticates the token, send a success response
    res.sendStatus(200);
});

// Example admin-only endpoint
router.get('/admin-only', authenticateToken, isAdmin, (req, res) => {
    // This endpoint is only accessible to admin users
    res.json({ message: 'You accessed an admin-only endpoint!' });
});

module.exports = router;
