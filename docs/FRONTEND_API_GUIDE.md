# PathFinder AI - Frontend Developer API Integration Guide

## API Base Configuration

### Base URL
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-domain.com/api'
  : 'http://localhost:3000/api';
```

### API Client Setup (Axios Example)

```javascript
// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## API Service Modules

### 1. Authentication Service

```javascript
// src/services/authService.js
import apiClient from './apiClient';

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/users/register', userData);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data._id);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/users/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data._id);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get current user ID
  getCurrentUserId: () => {
    return localStorage.getItem('userId');
  }
};
```

### 2. Skills Service

```javascript
// src/services/skillsService.js
import apiClient from './apiClient';

export const skillsService = {
  // Get all skills for current user
  getUserSkills: async (userId) => {
    const response = await apiClient.get(`/skills/user/${userId}`);
    return response.data;
  },

  // Create new skill
  createSkill: async (skillData) => {
    const response = await apiClient.post('/skills', skillData);
    return response.data;
  },

  // Update skill
  updateSkill: async (skillId, skillData) => {
    const response = await apiClient.put(`/skills/${skillId}`, skillData);
    return response.data;
  },

  // Delete skill
  deleteSkill: async (skillId) => {
    const response = await apiClient.delete(`/skills/${skillId}`);
    return response.data;
  }
};
```

### 3. Qualifications Service

```javascript
// src/services/qualificationsService.js
import apiClient from './apiClient';

export const qualificationsService = {
  // Get user qualifications
  getUserQualifications: async (userId) => {
    const response = await apiClient.get(`/qualifications/user/${userId}`);
    return response.data;
  },

  // Create qualification
  createQualification: async (qualificationData) => {
    const response = await apiClient.post('/qualifications', qualificationData);
    return response.data;
  },

  // Update qualification
  updateQualification: async (qualificationId, qualificationData) => {
    const response = await apiClient.put(`/qualifications/${qualificationId}`, qualificationData);
    return response.data;
  },

  // Delete qualification
  deleteQualification: async (qualificationId) => {
    const response = await apiClient.delete(`/qualifications/${qualificationId}`);
    return response.data;
  }
};
```

### 4. Interests Service

```javascript
// src/services/interestsService.js
import apiClient from './apiClient';

export const interestsService = {
  // Get user interests
  getUserInterests: async (userId) => {
    const response = await apiClient.get(`/interests/user/${userId}`);
    return response.data;
  },

  // Create interest
  createInterest: async (interestData) => {
    const response = await apiClient.post('/interests', interestData);
    return response.data;
  },

  // Update interest
  updateInterest: async (interestId, interestData) => {
    const response = await apiClient.put(`/interests/${interestId}`, interestData);
    return response.data;
  },

  // Delete interest
  deleteInterest: async (interestId) => {
    const response = await apiClient.delete(`/interests/${interestId}`);
    return response.data;
  }
};
```

### 5. Recommendations Service (AI-Powered)

```javascript
// src/services/recommendationsService.js
import apiClient from './apiClient';

export const recommendationsService = {
  // Generate AI career recommendations - Main Feature
  generateRecommendations: async (userId) => {
    try {
      const response = await apiClient.post(`/recommendations/generate/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error('Please add your skills, qualifications, or interests first before generating recommendations.');
      }
      throw error.response?.data || error.message;
    }
  },

  // Get user recommendations
  getUserRecommendations: async (userId) => {
    const response = await apiClient.get(`/recommendations/user/${userId}`);
    return response.data;
  },

  // Get single recommendation details
  getRecommendation: async (recommendationId) => {
    const response = await apiClient.get(`/recommendations/${recommendationId}`);
    return response.data;
  },

  // Delete recommendation
  deleteRecommendation: async (recommendationId) => {
    const response = await apiClient.delete(`/recommendations/${recommendationId}`);
    return response.data;
  }
};
```

---

## React Component Examples

### Authentication Component

```jsx
// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { authService } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await authService.login(email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
```

### Career Recommendations Component

```jsx
// src/components/Career/CareerRecommendations.jsx
import React, { useState, useEffect } from 'react';
import { recommendationsService } from '../../services/recommendationsService';
import { authService } from '../../services/authService';

const CareerRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const userId = authService.getCurrentUserId();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const data = await recommendationsService.getUserRecommendations(userId);
      setRecommendations(data);
    } catch (err) {
      if (err.response?.status !== 404) {
        setError('Failed to load recommendations');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRecommendations = async () => {
    setGenerating(true);
    setError('');
    
    try {
      const result = await recommendationsService.generateRecommendations(userId);
      setRecommendations(result.recommendations);
    } catch (err) {
      setError(err.message || 'Failed to generate recommendations');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="recommendations-container">
      <h2>Career Recommendations</h2>
      
      <button 
        onClick={handleGenerateRecommendations}
        disabled={generating}
        className="generate-btn"
      >
        {generating ? 'Generating with AI...' : 'Generate New Recommendations'}
      </button>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div>Loading recommendations...</div>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map((rec) => (
            <div key={rec._id} className="recommendation-card">
              <h3>{rec.careerSuggestion}</h3>
              <p>{rec.justification}</p>
              <div className="confidence">
                Confidence: {(rec.confidenceScore * 100).toFixed(0)}%
              </div>
              {rec.skillGaps && rec.skillGaps.length > 0 && (
                <div className="skill-gaps">
                  <h4>Skills to Develop:</h4>
                  <ul>
                    {rec.skillGaps.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerRecommendations;
```

---

## Data Models / Types

```typescript
// For TypeScript projects

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  userId: string;
  skillName: string;
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  yearsExperience?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Qualification {
  _id: string;
  userId: string;
  title: string;
  institution?: string;
  dateObtained?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Interest {
  _id: string;
  userId: string;
  interestName: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  _id: string;
  userId: string;
  careerSuggestion: string;
  justification?: string;
  courseLink?: string;
  aiModelUsed?: string;
  confidenceScore: number;
  skillGaps?: string[];
  createdAt: string;
  updatedAt: string;
}
```

---

## Error Handling Best Practices

```javascript
// Global error handler
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 400:
        return error.response.data.message || 'Invalid request';
      case 401:
        return 'Please login to continue';
      case 404:
        return 'Resource not found';
      case 500:
        return 'Server error. Please try again later';
      default:
        return 'An error occurred';
    }
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection';
  } else {
    // Something else happened
    return error.message || 'An error occurred';
  }
};
```

---

## Important Notes for Frontend Developers

1. **Authentication**: Always check if user is authenticated before making protected API calls
2. **User ID**: Store the user ID in localStorage after login for use in subsequent requests
3. **Token Management**: Tokens expire after 7 days - handle token refresh or re-login
4. **AI Generation**: The generate recommendations endpoint may take 5-15 seconds to respond
5. **Data Validation**: Validate user input on frontend before sending to API
6. **Loading States**: Always show loading indicators during API calls
7. **Error Messages**: Display user-friendly error messages from API responses
8. **CORS**: Backend is configured to accept requests from all origins in development
