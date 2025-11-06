# PathFinder AI - API Documentation for Postman Testing

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. User Authentication Endpoints

### 1.1 Register New User
**Endpoint:** `POST /users/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Success Response (201):**
```json
{
  "_id": "6547abc123def456789",
  "username": "john_doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.2 Login User
**Endpoint:** `POST /users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**
```json
{
  "_id": "6547abc123def456789",
  "username": "john_doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.3 Get User Profile
**Endpoint:** `GET /users/:id`

**Success Response (200):**
```json
{
  "_id": "6547abc123def456789",
  "username": "john_doe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2024-11-01T10:30:00.000Z",
  "updatedAt": "2024-11-01T10:30:00.000Z"
}
```

### 1.4 Update User Profile
**Endpoint:** `PUT /users/:id`

**Request Body:**
```json
{
  "firstName": "Johnny",
  "lastName": "Doe"
}
```

### 1.5 Delete User
**Endpoint:** `DELETE /users/:id`

**Success Response (200):**
```json
{
  "message": "User deleted"
}
```

---

## 2. Skills Endpoints

### 2.1 Create Skill
**Endpoint:** `POST /skills`

**Request Body:**
```json
{
  "userId": "6547abc123def456789",
  "skillName": "Python Programming",
  "proficiencyLevel": "Advanced",
  "yearsExperience": 5
}
```

**Success Response (201):**
```json
{
  "_id": "654xyz...",
  "userId": "6547abc123def456789",
  "skillName": "Python Programming",
  "proficiencyLevel": "Advanced",
  "yearsExperience": 5,
  "createdAt": "2024-11-01T10:30:00.000Z",
  "updatedAt": "2024-11-01T10:30:00.000Z"
}
```

**Proficiency Levels:** Beginner, Intermediate, Advanced

### 2.2 Get All Skills
**Endpoint:** `GET /skills`

**Success Response (200):**
```json
[
  {
    "_id": "654xyz...",
    "userId": {
      "_id": "6547abc...",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "skillName": "Python Programming",
    "proficiencyLevel": "Advanced",
    "yearsExperience": 5
  }
]
```

### 2.3 Get Skills by User ID
**Endpoint:** `GET /skills/user/:userId`

**Success Response (200):** Same structure as Get All Skills but filtered for specific user

### 2.4 Get Skill by ID
**Endpoint:** `GET /skills/:id`

### 2.5 Update Skill
**Endpoint:** `PUT /skills/:id`

**Request Body:**
```json
{
  "proficiencyLevel": "Advanced",
  "yearsExperience": 6
}
```

### 2.6 Delete Skill
**Endpoint:** `DELETE /skills/:id`

---

## 3. Qualifications Endpoints

### 3.1 Create Qualification
**Endpoint:** `POST /qualifications`

**Request Body:**
```json
{
  "userId": "6547abc123def456789",
  "title": "Bachelor of Science in Computer Science",
  "institution": "Stanford University",
  "dateObtained": "2019-06-15",
  "description": "Specialized in AI and Machine Learning"
}
```

### 3.2 Get All Qualifications
**Endpoint:** `GET /qualifications`

### 3.3 Get Qualifications by User ID
**Endpoint:** `GET /qualifications/user/:userId`

### 3.4 Get Qualification by ID
**Endpoint:** `GET /qualifications/:id`

### 3.5 Update Qualification
**Endpoint:** `PUT /qualifications/:id`

### 3.6 Delete Qualification
**Endpoint:** `DELETE /qualifications/:id`

---

## 4. Interests Endpoints

### 4.1 Create Interest
**Endpoint:** `POST /interests`

**Request Body:**
```json
{
  "userId": "6547abc123def456789",
  "interestName": "Artificial Intelligence",
  "description": "Interested in AI ethics and applications"
}
```

### 4.2 Get All Interests
**Endpoint:** `GET /interests`

### 4.3 Get Interests by User ID
**Endpoint:** `GET /interests/user/:userId`

### 4.4 Get Interest by ID
**Endpoint:** `GET /interests/:id`

### 4.5 Update Interest
**Endpoint:** `PUT /interests/:id`

### 4.6 Delete Interest
**Endpoint:** `DELETE /interests/:id`

---

## 5. Career Recommendations Endpoints (AI-Powered)

### 5.1 Generate AI Career Recommendations ⭐
**Endpoint:** `POST /recommendations/generate/:userId`

**Description:** This is the main AI-powered endpoint that analyzes user data and generates personalized career recommendations using Google Gemini AI.

**Prerequisites:** User must have at least one skill, qualification, or interest added.

**URL Parameters:**
- `userId`: MongoDB ObjectId of the user

**Success Response (201):**
```json
{
  "message": "Career recommendations generated successfully",
  "recommendations": [
    {
      "_id": "654rec...",
      "userId": "6547abc...",
      "careerSuggestion": "Data Scientist",
      "justification": "Based on your advanced Python skills and AI interests, data science is an excellent fit...",
      "courseLink": "[{\"title\":\"Machine Learning A-Z\",\"link\":\"https://...\"}]",
      "aiModelUsed": "Gemini Pro",
      "confidenceScore": 0.92,
      "skillGaps": ["Advanced Statistics", "Deep Learning Frameworks"],
      "createdAt": "2024-11-01T10:30:00.000Z"
    }
  ],
  "aiResponse": {
    "recommendations": [
      {
        "career": "Data Scientist",
        "explanation": "...",
        "courses": [
          {
            "title": "Machine Learning A-Z",
            "link": "https://..."
          }
        ]
      }
    ]
  }
}
```

**Error Response (400):**
```json
{
  "message": "Insufficient data. Please add your skills, qualifications, or interests first."
}
```

### 5.2 Create Manual Recommendation
**Endpoint:** `POST /recommendations`

**Request Body:**
```json
{
  "userId": "6547abc123def456789",
  "careerSuggestion": "Software Engineer",
  "justification": "Strong programming skills",
  "courseLink": "https://example.com/course",
  "aiModelUsed": "Manual"
}
```

### 5.3 Get All Recommendations
**Endpoint:** `GET /recommendations`

### 5.4 Get Recommendations by User ID
**Endpoint:** `GET /recommendations/user/:userId`

**Success Response (200):**
```json
[
  {
    "_id": "654rec...",
    "userId": {
      "_id": "6547abc...",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "careerSuggestion": "Data Scientist",
    "justification": "...",
    "confidenceScore": 0.92,
    "skillGaps": ["Statistics", "Deep Learning"],
    "createdAt": "2024-11-01T10:30:00.000Z"
  }
]
```

### 5.5 Get Recommendation by ID
**Endpoint:** `GET /recommendations/:id`

### 5.6 Update Recommendation
**Endpoint:** `PUT /recommendations/:id`

### 5.7 Delete Recommendation
**Endpoint:** `DELETE /recommendations/:id`

---

## Testing Flow in Postman

### Complete Testing Sequence:

1. **Register a User** → Save the token
2. **Add Skills** → Create 2-3 skills for the user
3. **Add Qualifications** → Add educational background
4. **Add Interests** → Add career interests
5. **Generate AI Recommendations** → Call the AI endpoint
6. **View Recommendations** → Get recommendations by user ID

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid email or password"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error message"
}
```

---

## Environment Variables Required
```
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
GEMINI_API_KEY=<your_gemini_api_key>
```

---

## Notes for Testing

1. **Save your JWT token** after registration/login for subsequent requests
2. **Use the correct user ID** when creating skills, qualifications, or interests
3. The AI recommendation endpoint requires **at least one** skill, qualification, or interest to work
4. MongoDB ObjectIDs are 24-character hexadecimal strings
5. All timestamps are in ISO 8601 format (UTC)
