const jwt = require('jsonwebtoken'); // You'll need to install jsonwebtoken: npm install jsonwebtoken
const User = require('../models/user'); // Import the User model
require('dotenv').config(); // Load environment variables from .env

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Get the token from the request header (e.g., Authorization: Bearer <token>)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' }); // 401 Unauthorized
        }

        const token = authHeader.split(' ')[1]; // Extract the token

        // 2. Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' }); // 401 Unauthorized
            }

            // 3. Attach the user object to the request
            const user = await User.findById(decoded.userId).select('-password'); // Exclude the password
            if (!user) {
                return res.status(401).json({ message: 'Invalid token' }); // User not found
            }

            req.user = user; // Attach the user object to the request
            next(); // Call the next middleware or route handler
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // 500 Internal Server Error
    }
};

module.exports = authMiddleware;