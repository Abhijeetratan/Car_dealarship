const faker = require('faker');

// Generate fake data for the admin table
function generateAdminData() {
    return {
        admin_id: faker.internet.userName(),
        password_hash: faker.internet.password()
    };
}

// Generate fake data for the user table
function generateUserData() {
    return {
        user_email: faker.internet.email(),
        user_id: faker.random.uuid(),
        user_location: faker.address.city(),
        user_info: {
            name: faker.name.firstName(),
            age: faker.random.number({ min: 18, max: 80 }),
            phone: faker.phone.phoneNumber()
        },
        password_hash: faker.internet.password(),
        vehicle_info: [] // Populate this based on your requirements
    };
}

// Generate fake data for the dealership table
function generateDealershipData() {
    return {
        dealership_email: faker.internet.email(),
        dealership_id: faker.random.uuid(),
        dealership_name: faker.company.companyName(),
        dealership_location: faker.address.city(),
        password_hash: faker.internet.password(),
        dealership_info: {}, // You can add faker data for dealership_info if needed
        cars: [], // Populate this based on your requirements
        deals: [], // Populate this based on your requirements
        sold_vehicles: [] // Populate this based on your requirements
    };
}

// Generate fake data for the deal table
function generateDealData() {
    return {
        deal_id: faker.random.uuid(),
        car_id: faker.random.uuid(),
        deal_info: {} // You can add faker data for deal_info if needed
    };
}

// Generate fake data for the cars table
function generateCarData() {
    return {
        car_id: faker.random.uuid(),
        type: faker.random.word(),
        name: faker.vehicle.vehicle(),
        model: faker.vehicle.model(),
        car_info: {} // You can add faker data for car_info if needed
    };
}

// Generate fake data for the sold_vehicles table
function generateSoldVehicleData() {
    return {
        vehicle_id: faker.random.uuid(),
        car_id: faker.random.uuid(),
        vehicle_info: {} // You can add faker data for vehicle_info if needed
    };
}

// Example usage
const adminData = generateAdminData();
const userData = generateUserData();
const dealershipData = generateDealershipData();
const dealData = generateDealData();
const carData = generateCarData();
const soldVehicleData = generateSoldVehicleData();

console.log('Generated Admin Data:', adminData);
console.log('Generated User Data:', userData);
console.log('Generated Dealership Data:', dealershipData);
console.log('Generated Deal Data:', dealData);
console.log('Generated Car Data:', carData);
console.log('Generated Sold Vehicle Data:', soldVehicleData);
