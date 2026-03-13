const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Ensure uploads directory exists
const fs = require('fs');
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Routes
router.post('/analyze', authMiddleware, upload.single('resume'), resumeController.analyzeResume);
router.get('/history', authMiddleware, resumeController.getAnalysisHistory);
router.get('/history/:id', authMiddleware, resumeController.getAnalysisById);
router.post('/cover-letter/:id', authMiddleware, resumeController.generateCoverLetter);

module.exports = router;
