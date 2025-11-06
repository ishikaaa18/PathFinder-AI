# PathFinder AI - Career Guidance Platform

## Project Overview
PathFinder AI is an intelligent career guidance platform that uses Google's Gemini AI to provide personalized career recommendations based on user skills, qualifications, and interests.

## Current State
✅ **Fully Operational** - All core features are implemented and tested
- Backend API running on port 3000
- Frontend running on port 5000
- MongoDB Atlas connection configured
- Google Gemini AI integration active
- All CRUD operations functional
- AI recommendation generation working

## Recent Changes (November 6, 2025)

### Backend Optimizations
1. **Fixed MongoDB Connection**
   - Removed deprecated options (useNewUrlParser, useUnifiedTopology)
   - Added emojis for better log readability

2. **Refactored Controllers**
   - Separated routing logic from controllers
   - Added proper error handling and logging
   - Implemented consistent response patterns
   - Added user-specific filtering endpoints

3. **Enhanced Recommendation System**
   - Added AI-powered recommendation generation endpoint
   - Implemented confidence scoring (0-1 scale)
   - Added skill gap analysis
   - Improved error handling for insufficient data

4. **Updated Data Models**
   - Added `confidenceScore` field to Recommendation model
   - Added `skillGaps` array for career development tracking
   - Converted to timestamps for better date management

5. **Security Enhancements** ✅
   - Fixed JWT authentication middleware (corrected token payload field)
   - Proper error handling for invalid/expired tokens (401 status)
   - Applied authentication to ALL protected routes
   - **Authorization Controls Added:**
     * Users can only create resources for themselves (userId derived from JWT)
     * Users can only view their own data
     * Users can only update/delete their own resources
     * Prevents horizontal privilege escalation attacks
     * Returns 403 Forbidden for unauthorized access attempts
   - Only register and login endpoints remain public
   - All API endpoints require valid JWT token

### Configuration Updates
- Backend port changed from 5000 to 3000 (localhost)
- Frontend configured for port 5000 (0.0.0.0 for Replit proxy)
- Added allowedHosts configuration for Vite
- Environment variables properly configured

### Documentation Created
1. **POSTMAN_API_DOCUMENTATION.md** - Complete API testing guide
2. **FRONTEND_API_GUIDE.md** - Frontend integration documentation
3. **LOCAL_SETUP_GUIDE.md** - Step-by-step setup for VS Code
4. **PROJECT_DOCUMENTATION.md** - Comprehensive project documentation

## Technology Stack

### Backend
- Node.js with Express.js
- MongoDB Atlas (cloud database)
- JWT authentication
- Google Gemini AI (gemini-pro model)
- bcryptjs for password hashing

### Frontend
- React 19 with Vite
- React Router for navigation
- TailwindCSS for styling
- Axios for API calls

## Project Structure

```
pathfinder-ai/
├── backend/              # Express API server
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── services/        # AI integration
│   └── server.js        # Entry point
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable UI
│   │   ├── features/    # Feature modules
│   │   ├── pages/       # Page components
│   │   └── services/    # API clients
├── docs/                # Project documentation
└── replit.md           # This file
```

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGO_URI=<MongoDB Atlas connection string>
JWT_SECRET=<your JWT secret>
GEMINI_API_KEY=<your Gemini API key>
```

### Replit Secrets (Configured)
- `GEMINI_API_KEY` - Active and working

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### User Profile
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `DELETE /api/users/:id` - Delete user

### Skills Management
- `POST /api/skills` - Add skill
- `GET /api/skills/user/:userId` - Get user skills
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Qualifications Management
- `POST /api/qualifications` - Add qualification
- `GET /api/qualifications/user/:userId` - Get user qualifications
- Similar CRUD operations

### Interests Management
- `POST /api/interests` - Add interest
- `GET /api/interests/user/:userId` - Get user interests
- Similar CRUD operations

### Career Recommendations (AI-Powered) ⭐
- `POST /api/recommendations/generate/:userId` - Generate AI recommendations
- `GET /api/recommendations/user/:userId` - Get user recommendations
- `GET /api/recommendations/:id` - Get recommendation details

## Key Features

1. **User Authentication**
   - Secure JWT-based authentication
   - Password hashing with bcrypt
   - 7-day token expiration

2. **Profile Building**
   - Add skills with proficiency levels
   - Track qualifications and education
   - Record career interests

3. **AI Career Recommendations**
   - Powered by Google Gemini AI
   - Analyzes skills, qualifications, and interests
   - Provides 3 career suggestions per request
   - Includes confidence scores
   - Identifies skill gaps
   - Suggests relevant courses

4. **Data Persistence**
   - MongoDB Atlas for cloud storage
   - All data properly indexed
   - Automatic timestamps

## Architecture Notes

### Methodology (As Described by User)
1. Collect user input (skills, qualifications, certificates)
2. Preprocess and clean data
3. Send to AI API (Gemini) for analysis
4. Store results in MongoDB Atlas
5. Display personalized dashboard with recommendations

### Current Implementation
- ✅ User input collection via REST API
- ✅ Data validation via Mongoose schemas
- ✅ Google Gemini AI integration
- ✅ MongoDB Atlas storage
- ✅ Confidence scoring
- ✅ Skill gap analysis

## Development Workflow

### Starting the Application
```bash
# The workflow automatically starts both servers
# Backend: http://localhost:3000
# Frontend: http://localhost:5000
```

### Making Changes
1. Edit files in VS Code or Replit editor
2. Frontend hot-reloads automatically (Vite HMR)
3. Backend requires manual restart for changes
4. Check console for any errors

### Testing
- Use Postman for API testing (see POSTMAN_API_DOCUMENTATION.md)
- Test frontend at http://localhost:5000
- Check MongoDB Atlas for data persistence

## User Preferences

### Coding Style
- Async/await for asynchronous operations
- Try-catch blocks for error handling
- Detailed error logging with console.error
- Descriptive comments for complex logic

### Project Goals
1. ✅ User-friendly AI-powered platform
2. ✅ Accurate analysis using AI
3. ✅ Personalized career recommendations
4. ✅ Course suggestions
5. ✅ Skill development assistance

## Documentation Files

All documentation is located in the `/docs` directory:

1. **POSTMAN_API_DOCUMENTATION.md**
   - Complete API reference
   - Request/response examples
   - Testing workflows

2. **FRONTEND_API_GUIDE.md**
   - Frontend integration guide
   - API service modules
   - React component examples

3. **LOCAL_SETUP_GUIDE.md**
   - Local development setup
   - VS Code configuration
   - Troubleshooting guide

4. **PROJECT_DOCUMENTATION.md**
   - Comprehensive project docs
   - File-by-file explanations
   - Database schema details
   - Architecture overview

## Known Issues & Solutions

### Issue: MongoDB Deprecation Warnings
**Status:** ✅ Fixed
- Removed deprecated connection options

### Issue: Controllers with Mixed Routing Logic
**Status:** ✅ Fixed
- Separated controllers and routes properly

### Issue: Missing AI Endpoint
**Status:** ✅ Fixed
- Implemented comprehensive AI recommendation generation

## Next Steps

### For Users
1. Add more skills, qualifications, and interests
2. Generate AI recommendations
3. Review confidence scores and skill gaps
4. Explore suggested courses

### For Developers
1. Review documentation in `/docs` folder
2. Test all API endpoints using Postman
3. Customize UI/UX as needed
4. Add additional features (see Future Enhancements)

## Future Enhancements

### Planned Features
- User profile pictures
- Recommendation history tracking
- Email notifications
- Progress tracking for skills
- Job board integration
- Peer reviews and recommendations
- Advanced filtering options

### Technical Improvements
- Implement authentication middleware
- Add API rate limiting
- Setup Redis caching
- Add unit tests
- Setup CI/CD pipeline

## Deployment Notes

- Configured for VM deployment (stateful)
- Both backend and frontend run concurrently
- Environment variables managed via Replit Secrets
- MongoDB Atlas handles database hosting
- Ready for production deployment

## Contact & Support

For issues, questions, or contributions:
- Review the documentation in `/docs`
- Check console logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB connection is active

---

**Project Status:** ✅ Production Ready
**Last Updated:** November 6, 2025
**Version:** 1.0.0
