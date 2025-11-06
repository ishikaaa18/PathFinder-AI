// server.js (or app.js)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // You'll need to install cors: npm install cors
const morgan = require('morgan'); // You'll need to install morgan: npm install morgan
const dotenv = require('dotenv'); // You'll need to install dotenv: npm install dotenv

// Import route files
const userRoutes = require('./routes/userRoutes');
const qualificationRoutes = require('./routes/qualificationRoutes');
const skillRoutes = require('./routes/skillRoutes');
const interestRoutes = require('./routes/interestRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port, or default to 3000

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Log HTTP requests to the console in development mode

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Error handling middleware (example)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, 'localhost', () => {
    console.log(`Server is running on http://localhost:${port}`);
});