# PathFinder AI - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Backend Documentation](#backend-documentation)
4. [Frontend Documentation](#frontend-documentation)
5. [Database Schema](#database-schema)
6. [API Endpoints Reference](#api-endpoints-reference)
7. [AI Integration](#ai-integration)
8. [Security Implementation](#security-implementation)

---

## Project Overview

### Purpose
PathFinder AI is an AI-powered career guidance platform that helps users discover suitable career paths based on their skills, qualifications, and interests. The system uses Google's Gemini AI to provide personalized career recommendations and suggest relevant learning resources.

### Key Features
- ✅ User authentication with JWT
- ✅ Profile management (skills, qualifications, interests)
- ✅ AI-powered career recommendations using Google Gemini
- ✅ Confidence scoring for recommendations
- ✅ Skill gap analysis
- ✅ Course suggestions for career development
- ✅ Persistent storage with MongoDB
- ✅ RESTful API architecture

### Project Goals
1. Accurately analyze user data using NLP and machine learning
2. Provide personalized career path recommendations
3. Suggest relevant online courses and learning resources
4. Assist students in future career planning and skill development
5. Deliver an intuitive, user-friendly interface

---

## Architecture & Technology Stack

### System Architecture
```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │ ◄─────► │ Express Backend │ ◄─────► │  MongoDB Atlas  │
│  (Port 5000)    │  HTTP   │  (Port 3000)    │         │   (Cloud DB)    │
│                 │         │                 │         │                 │
└─────────────────┘         └────────┬────────┘         └─────────────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │                 │
                            │  Google Gemini  │
                            │   AI Service    │
                            │                 │
                            └─────────────────┘
```

### Technology Stack

**Backend:**
- Node.js v18+
- Express.js v5.1.0 - Web framework
- MongoDB with Mongoose v8.18.2 - Database
- JWT (jsonwebtoken v9.0.2) - Authentication
- bcryptjs v3.0.2 - Password hashing
- CORS v2.8.5 - Cross-origin requests
- Morgan v1.10.1 - HTTP request logging
- dotenv v17.2.2 - Environment configuration
- @google/generative-ai - Gemini AI SDK

**Frontend:**
- React v19.1.1
- React Router DOM v6.30.1 - Routing
- Vite v7.1.7 - Build tool & dev server
- TailwindCSS v3.4.14 - Styling
- ESLint - Code linting
- PostCSS & Autoprefixer - CSS processing

**Database:**
- MongoDB Atlas - Cloud-hosted NoSQL database

**AI/ML:**
- Google Gemini Pro - Large Language Model for career recommendations

---

## Backend Documentation

### Directory Structure
```
backend/
├── config/          # Database and app configuration
├── controllers/     # Request handlers & business logic
├── middleware/      # Authentication & validation middleware
├── models/          # Mongoose data models
├── routes/          # API route definitions
├── services/        # External service integrations (AI)
├── utils/           # Helper functions & utilities
├── tests/           # Unit and integration tests
├── .env             # Environment variables (not in version control)
├── package.json     # Dependencies and scripts
└── server.js        # Application entry point
```

### File-by-File Documentation

#### **server.js** - Main Application File
Entry point for the backend server.

**Key Functions:**
- Sets up Express application
- Configures middleware (CORS, JSON parsing, logging)
- Establishes MongoDB connection
- Defines API routes
- Starts HTTP server on specified port

**Code Flow:**
```javascript
1. Load environment variables from .env
2. Initialize Express app
3. Configure middleware (CORS, express.json, morgan)
4. Connect to MongoDB Atlas
5. Mount API routes under /api prefix
6. Configure error handling middleware
7. Start server on PORT (default: 3000)
```

**Environment Variables Used:**
- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `GEMINI_API_KEY` - Google Gemini API key

---

### Models (Database Schemas)

#### **models/user.js** - User Model
Defines the user data structure and authentication methods.

**Schema Fields:**
```javascript
{
  username: String (required, unique),
  email: String (required, unique, email format),
  password: String (required, hashed),
  firstName: String (optional),
  lastName: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

**Key Methods:**
- `pre('save')` - Middleware to hash password before saving
- `matchPassword(enteredPassword)` - Compare entered password with stored hash

**Security Features:**
- Passwords hashed using bcrypt (10 salt rounds)
- Email validation using regex
- Unique constraints on username and email

---

#### **models/skill.js** - Skills Model
Stores user skills and proficiency levels.

**Schema Fields:**
```javascript
{
  userId: ObjectId (reference to User, required),
  skillName: String (required),
  proficiencyLevel: Enum['Beginner', 'Intermediate', 'Advanced'],
  yearsExperience: Number (optional),
  createdAt: Date,
  updatedAt: Date
}
```

**Use Cases:**
- Track technical and soft skills
- Proficiency level helps AI determine career fit
- Years of experience indicates expertise depth

---

#### **models/qualification.js** - Qualifications Model
Stores educational background and certifications.

**Schema Fields:**
```javascript
{
  userId: ObjectId (reference to User, required),
  title: String (required) - e.g., "Bachelor of Science",
  institution: String (optional) - e.g., "Stanford University",
  dateObtained: Date (optional),
  description: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

**Use Cases:**
- Educational background for career matching
- Certification tracking
- Academic achievement history

---

#### **models/interest.js** - Interests Model
Stores career interests and preferences.

**Schema Fields:**
```javascript
{
  userId: ObjectId (reference to User, required),
  interestName: String (required),
  description: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

**Use Cases:**
- Career preference indication
- Passion and motivation tracking
- Helps AI suggest aligned career paths

---

#### **models/recommendation.js** - Recommendations Model
Stores AI-generated career recommendations.

**Schema Fields:**
```javascript
{
  userId: ObjectId (reference to User, required),
  careerSuggestion: String (required),
  justification: String (optional),
  courseLink: String (optional, JSON-stringified array),
  aiModelUsed: String (default: 'Gemini Pro'),
  confidenceScore: Number (0-1, default: 0.8),
  skillGaps: Array of Strings,
  createdAt: Date,
  updatedAt: Date
}
```

**Special Fields:**
- `confidenceScore` - AI's confidence in the recommendation (0-1)
- `skillGaps` - Skills user needs to develop for this career
- `courseLink` - JSON string of course objects with title and link

---

### Controllers (Business Logic)

#### **controllers/userController.js** - User Management
Handles user authentication and profile operations.

**Functions:**

1. **`generateToken(id)`**
   - Generates JWT token for authenticated users
   - Token expires in 7 days
   - Returns signed token string

2. **`registerUser(req, res)`**
   - Creates new user account
   - Validates email uniqueness
   - Hashes password automatically (via model middleware)
   - Returns user data with JWT token
   - **Route:** POST /api/users/register

3. **`loginUser(req, res)`**
   - Authenticates user credentials
   - Compares hashed passwords
   - Returns JWT token on success
   - **Route:** POST /api/users/login

4. **`getUser(req, res)`**
   - Retrieves user profile by ID
   - Excludes password from response
   - **Route:** GET /api/users/:id

5. **`updateUser(req, res)`**
   - Updates user profile information
   - Re-hashes password if changed
   - **Route:** PUT /api/users/:id

6. **`deleteUser(req, res)`**
   - Deletes user account
   - **Route:** DELETE /api/users/:id

---

#### **controllers/skillController.js** - Skills Management
Manages user skills CRUD operations.

**Functions:**

1. **`createSkill(req, res)`** - Add new skill
2. **`getAllSkills(req, res)`** - Get all skills (admin view)
3. **`getSkillsByUserId(req, res)`** - Get skills for specific user
4. **`getSkillById(req, res)`** - Get single skill details
5. **`updateSkill(req, res)`** - Update skill information
6. **`deleteSkill(req, res)`** - Remove skill

**Key Features:**
- Population of user data in responses
- Sorting by years of experience
- Validation with Mongoose

---

#### **controllers/qualificationController.js** - Qualifications Management
Manages educational qualifications.

**Functions:**
- Similar CRUD operations as skills
- Sorted by date obtained (most recent first)
- User-specific filtering available

---

#### **controllers/interestController.js** - Interests Management
Manages career interests.

**Functions:**
- Standard CRUD operations
- User-specific interest retrieval
- Sorted by creation date

---

#### **controllers/recommendationController.js** - AI Recommendations (CORE FEATURE)
The heart of the application - generates and manages AI-powered career recommendations.

**Functions:**

1. **`createRecommendation(req, res)`**
   - Manually create a recommendation
   - **Route:** POST /api/recommendations

2. **`generateRecommendations(req, res)` ⭐ MAIN AI FUNCTION**
   - **Route:** POST /api/recommendations/generate/:userId
   
   **Process Flow:**
   ```
   1. Validate user exists
   2. Fetch user's skills, qualifications, and interests
   3. Validate sufficient data exists
   4. Prepare user data object for AI
   5. Call Gemini AI service
   6. Parse AI response
   7. Save recommendations to database
   8. Return results with confidence scores
   ```
   
   **Error Handling:**
   - Returns 404 if user not found
   - Returns 400 if insufficient data (no skills/qualifications/interests)
   - Returns 500 if AI generation fails
   
   **AI Response Processing:**
   - Extracts career suggestions
   - Parses course recommendations
   - Calculates confidence scores
   - Identifies skill gaps

3. **`getAllRecommendations(req, res)`**
   - Get all recommendations (admin view)
   - Sorted by creation date

4. **`getRecommendationsByUserId(req, res)`**
   - Get recommendations for specific user
   - **Route:** GET /api/recommendations/user/:userId

5. **`getRecommendationById(req, res)`**
   - Get single recommendation details

6. **`updateRecommendation(req, res)`**
   - Update recommendation (manual adjustments)

7. **`deleteRecommendation(req, res)`**
   - Remove recommendation

---

### Services

#### **services/geminiAIService.js** - AI Integration Service
Integrates with Google's Gemini AI for career recommendations.

**Function: `generateCareerRecommendations(userData)`**

**Input Parameter:**
```javascript
{
  skills: Array of Skill objects,
  qualifications: Array of Qualification objects,
  interests: Array of Interest objects,
  user: {
    username, email, firstName, lastName
  }
}
```

**Process:**
1. **Constructs detailed AI prompt** with:
   - List of user skills
   - Educational qualifications
   - Career interests
   - Request for structured JSON response

2. **Calls Gemini Pro model** with prompt

3. **Expected AI Response Format:**
```json
{
  "recommendations": [
    {
      "career": "Career Title",
      "explanation": "Why this career fits",
      "courses": [
        {"title": "Course Name", "link": "URL"}
      ]
    }
  ]
}
```

4. **Error Handling:**
   - JSON parsing errors logged with raw response
   - Network/API errors caught and thrown
   - Provides detailed error messages

**Environment Variables:**
- `GEMINI_API_KEY` - Required for API authentication

---

### Routes

#### **routes/userRoutes.js**
```javascript
POST   /api/users/register     - Register new user
POST   /api/users/login        - Login user
GET    /api/users/:id          - Get user profile
PUT    /api/users/:id          - Update user profile
DELETE /api/users/:id          - Delete user
```

#### **routes/skillRoutes.js**
```javascript
POST   /api/skills             - Create skill
GET    /api/skills             - Get all skills
GET    /api/skills/user/:userId - Get user's skills
GET    /api/skills/:id         - Get skill by ID
PUT    /api/skills/:id         - Update skill
DELETE /api/skills/:id         - Delete skill
```

#### **routes/qualificationRoutes.js**
```javascript
POST   /api/qualifications     - Create qualification
GET    /api/qualifications     - Get all qualifications
GET    /api/qualifications/user/:userId - Get user's qualifications
GET    /api/qualifications/:id - Get qualification by ID
PUT    /api/qualifications/:id - Update qualification
DELETE /api/qualifications/:id - Delete qualification
```

#### **routes/interestRoutes.js**
```javascript
POST   /api/interests          - Create interest
GET    /api/interests          - Get all interests
GET    /api/interests/user/:userId - Get user's interests
GET    /api/interests/:id      - Get interest by ID
PUT    /api/interests/:id      - Update interest
DELETE /api/interests/:id      - Delete interest
```

#### **routes/recommendationRoutes.js** ⭐
```javascript
POST   /api/recommendations/generate/:userId - Generate AI recommendations
GET    /api/recommendations/user/:userId - Get user's recommendations
POST   /api/recommendations     - Create manual recommendation
GET    /api/recommendations     - Get all recommendations
GET    /api/recommendations/:id - Get recommendation by ID
PUT    /api/recommendations/:id - Update recommendation
DELETE /api/recommendations/:id - Delete recommendation
```

---

### Middleware

#### **middleware/authMiddleware.js**
JWT authentication middleware (if implemented).

**Purpose:** Protect routes that require authentication

**Functionality:**
- Extracts JWT token from Authorization header
- Verifies token signature
- Attaches user data to request object
- Blocks unauthorized requests

**Usage:**
```javascript
router.get('/protected', authMiddleware, controller.protectedRoute);
```

---

### Utilities

#### **utils/apiFeatures.js**
Helper functions for API operations (filtering, pagination, sorting).

---

## Frontend Documentation

### Directory Structure
```
frontend/
├── public/          # Static assets (favicon, images)
├── src/
│   ├── assets/      # Images, logos
│   ├── components/  # Reusable UI components
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── context/     # React Context for state management
│   │   └── AuthContext.jsx
│   ├── features/    # Feature-specific modules
│   │   ├── auth/    # Authentication feature
│   │   │   ├── auth.service.js
│   │   │   └── AuthForm.jsx
│   │   └── career/  # Career recommendations feature
│   │       ├── career.service.js
│   │       ├── CareerCard.jsx
│   │       └── CareerRecommendations.jsx
│   ├── hooks/       # Custom React hooks
│   │   └── useAuth.js
│   ├── layouts/     # Page layout components
│   │   ├── DashboardLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/       # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/    # API service modules
│   │   ├── apiClient.js
│   │   └── careerApi.js
│   ├── styles/      # CSS files
│   │   └── index.css
│   ├── utils/       # Utility functions
│   │   ├── constants.js
│   │   └── validators.js
│   ├── App.jsx      # Main app component
│   └── main.jsx     # React entry point
├── index.html       # HTML template
├── package.json     # Dependencies
├── vite.config.js   # Vite configuration
└── tailwind.config.cjs # TailwindCSS configuration
```

### Configuration Files

#### **vite.config.js**
Vite development server and build configuration.

```javascript
{
  plugins: [react()],
  server: {
    host: '0.0.0.0',        // Allow external connections
    port: 5000,              // Frontend port
    allowedHosts: ['all']    // Allow proxy connections (Replit)
  }
}
```

**Purpose:**
- Enables HMR (Hot Module Replacement)
- Configures port for frontend
- Allows connections from Replit proxy

#### **tailwind.config.cjs**
TailwindCSS styling configuration.

---

### Key Frontend Components

#### **App.jsx**
Main application component with routing setup.

**Routes:**
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - User dashboard (protected)

#### **pages/Home.jsx**
Landing page with app introduction.

#### **pages/Login.jsx**
User login form.

#### **pages/Dashboard.jsx**
Main dashboard showing user data and recommendations.

#### **features/career/CareerRecommendations.jsx**
Component for displaying and generating career recommendations.

**Key Features:**
- Fetches existing recommendations
- Button to generate new AI recommendations
- Loading states during AI processing
- Error handling and display
- Recommendation cards with confidence scores

---

## Database Schema

### Collections Overview

```
pathfinderAI (Database)
├── users            # User accounts
├── skills           # User skills
├── qualifications   # Educational background
├── interests        # Career interests
└── recommendations  # AI-generated recommendations
```

### Relationships

```
User (1) ──┬──> (Many) Skills
           ├──> (Many) Qualifications
           ├──> (Many) Interests
           └──> (Many) Recommendations
```

---

## API Endpoints Reference

### Quick Reference Table

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/api/users/register` | Register user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/users/:id` | Get user profile | Yes |
| POST | `/api/skills` | Create skill | Yes |
| GET | `/api/skills/user/:userId` | Get user skills | Yes |
| POST | `/api/recommendations/generate/:userId` | Generate AI recommendations | Yes |
| GET | `/api/recommendations/user/:userId` | Get user recommendations | Yes |

---

## AI Integration

### Google Gemini Pro Integration

**Model Used:** `gemini-pro`

**Input:** User's complete profile (skills, qualifications, interests)

**Output:** JSON structure with:
- Career recommendations (3 suggestions)
- Explanations for each recommendation
- Relevant online courses with links

**Prompt Engineering:**
The AI prompt is carefully constructed to:
1. Provide context about the user
2. Request structured JSON output
3. Ask for specific format (career, explanation, courses)
4. Ensure actionable and practical recommendations

**Processing Time:** 5-15 seconds per request

**Error Handling:**
- Validates JSON response structure
- Logs raw response for debugging
- Graceful error messages to users

---

## Security Implementation

### Authentication
- JWT-based authentication
- Tokens valid for 7 days
- Secure token generation with secret key

### Password Security
- bcryptjs hashing (10 salt rounds)
- Passwords never returned in API responses
- Automatic hashing on user creation/update

### Data Validation
- Mongoose schema validation
- Email format validation
- Required field enforcement
- Enum constraints for proficiency levels

### API Security
- CORS enabled for cross-origin requests
- Input sanitization via Mongoose
- Error messages don't expose sensitive data

---

## Development Notes

### Code Style
- Async/await for asynchronous operations
- Try-catch blocks for error handling
- Descriptive function and variable names
- Comments for complex logic

### Error Handling Pattern
```javascript
try {
  // Operation
  res.json(data);
} catch (error) {
  console.error('Error description:', error);
  res.status(500).json({ message: error.message });
}
```

### MongoDB Best Practices
- Use of populate() for related data
- Indexes on frequently queried fields
- Timestamps enabled on all models
- Proper use of ObjectId references

---

## Future Enhancements

### Planned Features
1. User profile pictures
2. Advanced filtering for recommendations
3. Recommendation history tracking
4. Email notifications
5. Social sharing of career paths
6. Progress tracking for skill development
7. Integration with job boards
8. Peer recommendations and reviews

### Scalability Considerations
- Caching layer (Redis) for frequent queries
- Rate limiting for AI API calls
- Database indexing optimization
- Load balancing for high traffic
- CDN for static assets

---

## Conclusion

PathFinder AI is a comprehensive career guidance platform that leverages AI to provide personalized recommendations. The modular architecture allows for easy maintenance and feature additions, while the clean separation between frontend and backend ensures scalability and flexibility.

---

**Last Updated:** November 6, 2025
**Version:** 1.0.0
**Maintained By:** PathFinder AI Development Team
