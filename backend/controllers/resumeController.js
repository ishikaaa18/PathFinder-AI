const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
const fs = require('fs');
const ResumeAnalysis = require('../models/ResumeAnalysis');
require('dotenv').config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

// @desc    Analyze resume against a target career
// @route   POST /api/resume/analyze
// @access  Protected
exports.analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a PDF resume' });
        }

        const { targetCareer } = req.body;
        if (!targetCareer) {
            return res.status(400).json({ message: 'Target career is required' });
        }

        // 1. Extract text from PDF
        console.log('Reading file from:', req.file.path);
        
        if (!fs.existsSync(req.file.path)) {
            throw new Error(`File not found at path: ${req.file.path}`);
        }

        const dataBuffer = fs.readFileSync(req.file.path);
        console.log('File read, parsing PDF...');
        
        let resumeText = '';
        try {
            const pdfData = await pdf(dataBuffer);
            resumeText = pdfData.text;
            console.log('PDF parsed, text length:', resumeText.length);
            
            if (!resumeText || resumeText.trim().length === 0) {
                throw new Error('Could not extract text from PDF. It might be an image-based PDF.');
            }
        } catch (pdfError) {
            console.error('PDF Parse Error:', pdfError);
            throw new Error(`Failed to parse PDF: ${pdfError.message}`);
        }

        // 2. Prepare AI Prompt
        console.log('Sending to AI...');
        const prompt = `
            Act as an expert Career Coach and Resume Analyst.
            
            Target Career: "${targetCareer}"
            
            Resume Content:
            "${resumeText.substring(0, 10000)}" // Limit text length to avoid token limits
            
            Analyze the resume specifically for the "${targetCareer}" role.
            
            Provide the output in the following JSON format ONLY:
            {
                "matchScore": 75, // A number between 0-100 representing how well the resume fits the role
                "summary": "A brief 2-sentence summary of the analysis.",
                "missingSkills": ["Skill 1", "Skill 2", "Skill 3"], // List of critical skills missing for this role
                "improvements": [
                    "Actionable tip 1 (e.g., 'Add more metrics to your experience')",
                    "Actionable tip 2"
                ],
                "strengths": ["Strength 1", "Strength 2"]
            }
            
            CRITICAL: Return ONLY valid JSON. No markdown formatting.
        `;

        // 3. Generate Analysis
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean up markdown if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const analysisData = JSON.parse(text);

        // 4. Save to Database
        const analysis = await ResumeAnalysis.create({
            user: req.user._id,
            targetCareer,
            originalFilename: req.file.originalname,
            matchScore: analysisData.matchScore,
            summary: analysisData.summary,
            missingSkills: analysisData.missingSkills,
            improvements: analysisData.improvements,
            strengths: analysisData.strengths
        });

        // 5. Cleanup uploaded file
        fs.unlinkSync(req.file.path);

        res.json(analysis);

    } catch (error) {
        console.error('Error analyzing resume:', error);
        console.error('Error stack:', error.stack); // Log stack trace
        // Cleanup file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }
        res.status(500).json({ 
            message: 'Failed to analyze resume', 
            error: error.message,
            details: error.toString() 
        });
    }
};

// @desc    Get user's resume analysis history
// @route   GET /api/resume/history
// @access  Protected
exports.getAnalysisHistory = async (req, res) => {
    try {
        const history = await ResumeAnalysis.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .select('targetCareer matchScore summary createdAt originalFilename');
        
        res.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ message: 'Failed to fetch history' });
    }
};

// @desc    Get specific analysis details
// @route   GET /api/resume/history/:id
// @access  Protected
exports.getAnalysisById = async (req, res) => {
    try {
        const analysis = await ResumeAnalysis.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!analysis) {
            return res.status(404).json({ message: 'Analysis not found' });
        }

        res.json(analysis);
    } catch (error) {
        console.error('Error fetching analysis:', error);
        res.status(500).json({ message: 'Failed to fetch analysis details' });
    }
};
// @desc    Generate a cover letter for a specific analysis
// @route   POST /api/resume/cover-letter/:id
// @access  Protected
exports.generateCoverLetter = async (req, res) => {
    try {
        const analysis = await ResumeAnalysis.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!analysis) {
            return res.status(404).json({ message: 'Analysis not found' });
        }

        const prompt = `Write a professional, modern cover letter for a ${analysis.targetCareer} position.
            
            USER DATA:
            Resume Summary: ${analysis.summary}
            Top Strengths: ${analysis.strengths.join(', ')}
            Skills Gaps Identified: ${analysis.missingSkills.join(', ')}
            
            INSTRUCTIONS:
            1. The letter should be professional yet enthusiastic.
            2. Address the "Skills Gaps" by mentioning how the user is actively improving in these areas (mention that they are following a personalized learning roadmap with PathFinder AI).
            3. Highlight the "Strengths" and how they align with the ${analysis.targetCareer} role.
            4. Keep the tone confident but humble.
            5. Structure: Opening (expressing interest), Body (linking experience to the role and addressing gaps), and Closing (call to action).
            
            Format: Return the text directly. Do not use markdown backticks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const letterText = response.text();

        res.json({ coverLetter: letterText });

    } catch (error) {
        console.error('Error generating cover letter:', error);
        res.status(500).json({ message: 'Failed to generate cover letter' });
    }
};
