const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');
const faker = require('faker');

router.get('/dealerships/:carId', authenticateToken, async (req, res) => {
    try {
        const carId = req.params.carId;
        const fakeDealerships = [];
        for (let i = 0; i < 3; i++) {
            fakeDealerships.push({
                dealership_id: faker.random.uuid(),
                name: faker.company.companyName(),
                location: faker.address.city(),
                cars: [
                    {
                        car_id: carId,
                        type: faker.vehicle.type(),
                        name: faker.vehicle.vehicle(),
                        model: faker.vehicle.model(),
                        car_info: {} // You can add faker data for car_info if needed
                    }
                ]
            });
        }
        res.json(fakeDealerships);
    } catch (error) {
        console.error('Error retrieving dealerships:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// View all vehicles owned by the user along with dealer info endpoint
router.get('/vehicles', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const fakeVehicles = [];
        for (let i = 0; i < 5; i++) {
            fakeVehicles.push({
                vehicle_id: faker.random.uuid(),
                car_id: faker.random.uuid(),
                dealer_info: {
                    dealership_id: faker.random.uuid(),
                    name: faker.company.companyName(),
                    location: faker.address.city()
                }
            });
        }
        res.json(fakeVehicles);
    } catch (error) {
        console.error('Error retrieving vehicles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// View all deals on a certain car endpoint
router.get('/deals/:carId', authenticateToken, async (req, res) => {
    try {
        const carId = req.params.carId;
        const fakeDeals = [];
        for (let i = 0; i < 5; i++) {
            fakeDeals.push({
                deal_id: faker.random.uuid(),
                car_id: carId,
                deal_info: {} // You can add faker data for deal_info if needed
            });
        }
        res.json(fakeDeals);
    } catch (error) {
        console.error('Error retrieving deals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
