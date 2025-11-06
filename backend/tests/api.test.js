const request = require('supertest'); // You'll need to install supertest: npm install supertest
const app = require('../server'); // Import your Express app
const mongoose = require('mongoose');
const User = require('../models/user');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('API Endpoint Tests', () => {
    let mongoServer;
    let token; // Store the JWT token for authenticated requests

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Create a test user and generate a JWT token
        const testUser = new User({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        await testUser.save();

        // Generate a JWT token for the test user (replace with your actual JWT generation logic)
        token = 'YOUR_JWT_TOKEN_HERE'; // Replace this with your actual JWT generation logic
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should create a new user', async () => {
        const userData = {
            username: 'newuser',
            email: 'new@example.com',
            password: 'password123'
        };

        const response = await request(app)
            .post('/api/users')
            .send(userData)
            .expect(201); // Expect a 201 Created status code

        expect(response.body._id).toBeDefined();
        expect(response.body.username).toBe(userData.username);
    });

    it('should get all users', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`) // Add the JWT token to the request header
            .expect(200); // Expect a 200 OK status code

        expect(response.body).toBeInstanceOf(Array);
    });

    // Add more tests for other API endpoints
});