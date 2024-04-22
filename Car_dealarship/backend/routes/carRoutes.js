const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');
const faker = require('faker');

router.get('/cars', async (req, res) => {
    try {
        const fakeCars = [];
        for (let i = 0; i < 10; i++) {
            fakeCars.push({
                car_id: faker.random.uuid(),
                type: faker.vehicle.type(),
                name: faker.vehicle.vehicle(),
                model: faker.vehicle.model(),
                car_info: {} // You can add faker data for car_info if needed
            });
        }
        res.json(fakeCars);
    } catch (error) {
        console.error('Error retrieving cars:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// View all cars in a certain dealership endpoint
router.get('/cars/:dealershipId', authenticateToken, async (req, res) => {
    try {
        const dealershipId = req.params.dealershipId;
        const fakeCars = [];
        for (let i = 0; i < 5; i++) {
            fakeCars.push({
                car_id: faker.random.uuid(),
                type: faker.vehicle.type(),
                name: faker.vehicle.vehicle(),
                model: faker.vehicle.model(),
                car_info: {} // You can add faker data for car_info if needed
            });
        }
        res.json(fakeCars);
    } catch (error) {
        console.error('Error retrieving cars for dealership:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add new vehicle to the list of owned/sold vehicles endpoint
router.post('/vehicles', authenticateToken, async (req, res) => {
    try {
        // Retrieve car data from request body
        const vehicleData = req.body;
        
        // Create a fake success message
        const message = `Vehicle ${vehicleData.make} ${vehicleData.model} added successfully`;

        res.json({ message: message });
    } catch (error) {
        console.error('Error adding vehicle:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// View all deals from a certain dealership endpoint
router.get('/deals/:dealershipId', authenticateToken, async (req, res) => {
    try {
        const dealershipId = req.params.dealershipId;
        const fakeDeals = [];
        for (let i = 0; i < 5; i++) {
            fakeDeals.push({
                deal_id: faker.random.uuid(),
                car_id: faker.random.uuid(),
                deal_info: {} // You can add faker data for deal_info if needed
            });
        }
        res.json(fakeDeals);
    } catch (error) {
        console.error('Error retrieving deals for dealership:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
