const mongoose = require('mongoose');
const User = require('../models/user');
const { MongoMemoryServer } = require('mongodb-memory-server'); // For testing with an in-memory MongoDB

describe('User Model Tests', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should create a new user', async () => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User'
        };

        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.firstName).toBe(userData.firstName);
        expect(savedUser.lastName).toBe(userData.lastName);
    });

    it('should require a username', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'password123'
        };

        const user = new User(userData);

        let error;
        try {
            await user.save();
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.username).toBeDefined();
    });

    // Add more tests for validation, unique constraints, etc.
});