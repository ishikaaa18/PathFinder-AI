const jwt = require('jsonwebtoken'); // You'll need to install jsonwebtoken: npm install jsonwebtoken
const User = require('../models/user'); // Import the User model
require('dotenv').config(); // Load environment variables from .env

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Get the token from the request header (e.g., Authorization: Bearer <token>)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token

        // 2. Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            console.error('JWT verification error:', jwtError.message);
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            if (jwtError.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            }
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // 3. Attach the user object to the request
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Attach the user object to the request
        next(); // Call the next middleware or route handler

    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = authMiddleware;