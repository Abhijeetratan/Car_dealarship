const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');
const faker = require('faker');

// Add cars to the dealership endpoint
router.post('/cars', async (req, res) => {
    try {
        // Simulate adding cars to the dealership by sending a fake success message
        const message = 'Cars added to the dealership successfully';

        res.json({ message: message });
    } catch (error) {
        console.error('Error adding cars to the dealership:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add deals to the dealership endpoint
router.post('/deals', async (req, res) => {
    try {
        // Simulate adding deals to the dealership by sending a fake success message
        const message = 'Deals added to the dealership successfully';

        res.json({ message: message });
    } catch (error) {
        console.error('Error adding deals to the dealership:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// View all vehicles dealership has sold along with owner info endpoint
router.get('/sold-vehicles', async (req, res) => {
    try {
        // Generate fake data for sold vehicles and owner info
        const soldVehicles = [];
        for (let i = 0; i < 10; i++) {
            soldVehicles.push({
                vehicle_id: faker.random.uuid(),
                car_id: faker.random.uuid(),
                owner_info: {
                    user_id: faker.random.uuid(),
                    user_email: faker.internet.email(),
                    user_location: faker.address.city()
                }
            });
        }

        res.json(soldVehicles);
    } catch (error) {
        console.error('Error retrieving sold vehicles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
