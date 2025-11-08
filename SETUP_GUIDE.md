# PathFinder AI - Complete Local Setup Guide for VS Code

This comprehensive guide will help you set up and run PathFinder AI on your local machine using VS Code.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Backend Configuration](#backend-configuration)
4. [Frontend Configuration](#frontend-configuration)
5. [Running the Application](#running-the-application)
6. [Testing the Application](#testing-the-application)
7. [Troubleshooting](#troubleshooting)
8. [Development Tips](#development-tips)

---

## Prerequisites

Before starting, ensure you have the following installed:

### 1. Node.js (v18 or higher)
- Download from: https://nodejs.org/
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. MongoDB Atlas Account
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Note down your connection string

### 3. xAI Grok API Key
- Get your API key from: https://console.x.ai
- You'll need this for AI-powered career recommendations

### 4. VS Code (Recommended IDE)
- Download from: https://code.visualstudio.com/
- Install recommended extensions:
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense

### 5. Git
- Download from: https://git-scm.com/
- Verify installation: `git --version`

---

## Initial Setup

### Step 1: Clone or Download the Project

```bash
# Clone the repository (if using Git)
git clone <repository-url>
cd pathfinder-ai

# OR download and extract the ZIP file
```

### Step 2: Open Project in VS Code

```bash
# Open the project in VS Code
code .
```

---

## Backend Configuration

### Step 1: Install Backend Dependencies

Open a terminal in VS Code (Terminal → New Terminal) and run:

```bash
cd backend
npm install
```

**Packages installed:**
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- cors - Cross-origin requests
- dotenv - Environment variables
- openai - Grok AI integration (OpenAI-compatible)
- morgan - HTTP request logger
- nodemon - Development auto-restart

### Step 2: Create Environment File

Create a file named `.env` in the `backend` directory:

```bash
# In backend directory
touch .env
```

Add the following content to `backend/.env`:

```env
# Server Configuration
PORT=3000

# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/pathfinderAI?retryWrites=true&w=majority

# JWT Secret (generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# xAI Grok API Key
GROK_API_KEY=your_grok_api_key_here
```

**Important:**
- Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your MongoDB Atlas credentials
- Replace `your_grok_api_key_here` with your actual Grok API key
- Generate a secure JWT secret using:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

### Step 3: Get MongoDB Connection String

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Update the database name to `pathfinderAI`

### Step 4: Test Backend Server

```bash
# From backend directory
npm start

# For development with auto-reload
npm run dev
```

**Expected output:**
```
Server is running on http://localhost:3000
✅ Connected to MongoDB
```

If you see this, your backend is ready!

---

## Frontend Configuration

### Step 1: Install Frontend Dependencies

Open a new terminal in VS Code and run:

```bash
cd frontend
npm install
```

**Packages installed:**
- React & React DOM
- React Router - Client-side routing
- Axios - HTTP client for API calls
- Vite - Fast build tool and dev server
- TailwindCSS - Utility-first CSS framework
- Development tools (ESLint, etc.)

### Step 2: Configure Environment Variables

Create a file named `.env` in the `frontend` directory:

```bash
# In frontend directory
touch .env
```

Add the following:

```env
VITE_API_URL=http://localhost:3000/api
```

### Step 3: Start Frontend Development Server

```bash
# From frontend directory
npm run dev
```

**Expected output:**
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5000/
➜  Network: http://192.168.x.x:5000/
```

---

## Running the Application

### Option 1: Two Separate Terminals (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using VS Code Tasks

Create a `.vscode/tasks.json` file in your project root:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "cd backend && npm run dev",
      "isBackground": true,
      "problemMatcher": []
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "cd frontend && npm run dev",
      "isBackground": true,
      "problemMatcher": []
    },
    {
      "label": "Start All",
      "dependsOn": ["Start Backend", "Start Frontend"]
    }
  ]
}
```

Then run: `Terminal → Run Task → Start All`

---

## Testing the Application

### 1. Access the Application

Open your browser and navigate to:
- Frontend: http://localhost:5000
- Backend API: http://localhost:3000/api

### 2. Test User Registration

1. Go to http://localhost:5000/register
2. Fill in the registration form:
   - Username: testuser
   - Email: test@example.com
   - Password: TestPass123
   - First Name: Test
   - Last Name: User
3. Click "Register"
4. You should be redirected to login or dashboard

### 3. Test Login

1. Go to http://localhost:5000/login
2. Enter your credentials
3. You should be logged in and see the dashboard

### 4. Test Career Recommendations

1. Go to Dashboard
2. Add at least one skill, qualification, or interest
3. Click "Generate Recommendations"
4. Wait for AI to process (5-15 seconds)
5. View your personalized career recommendations

### 5. Test with API Tools (Optional)

Use Postman, Insomnia, or Thunder Client VS Code extension to test API endpoints directly.

**Example - Register User:**
```
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "TestPass123",
  "firstName": "Test",
  "lastName": "User"
}
```

---

## Troubleshooting

### Issue 1: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using the port
# On Windows
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or change the port in backend/.env
PORT=3001
```

### Issue 2: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: Could not connect to MongoDB`

**Solutions:**
1. Check internet connection
2. Verify MongoDB Atlas credentials in `.env`
3. Whitelist your IP address:
   - Go to MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)
4. Ensure connection string is correct

### Issue 3: Grok API Key Invalid

**Error:** `Failed to generate career recommendations`

**Solutions:**
1. Verify API key in `backend/.env`
2. Check for extra spaces or quotes
3. Ensure key is active at https://console.x.ai
4. Check API usage limits

### Issue 4: Frontend Can't Connect to Backend

**Error:** `Network Error` or `CORS Error`

**Solutions:**
1. Ensure backend is running on port 3000
2. Check `frontend/.env` has correct API URL
3. Verify CORS is enabled in backend
4. Clear browser cache and cookies

### Issue 5: npm install Fails

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still fails, try with legacy peer deps
npm install --legacy-peer-deps
```

### Issue 6: Vite Build Errors

**Error:** `Failed to resolve import`

**Solutions:**
1. Restart the dev server
2. Delete `node_modules` and reinstall
3. Clear Vite cache:
   ```bash
   rm -rf node_modules/.vite
   ```

---

## Development Tips

### 1. VS Code Extensions for Better DX

Install these extensions:
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **ES7+ React snippets** - React code snippets
- **Thunder Client** - API testing (Postman alternative)
- **MongoDB for VS Code** - Database management
- **GitLens** - Enhanced Git features

### 2. Keyboard Shortcuts

- `Ctrl+` ` - Toggle terminal
- `Ctrl+B` - Toggle sidebar
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+F` - Search across files
- `Alt+Click` - Multiple cursors

### 3. Debugging

**Backend Debugging:**
1. Add breakpoints in VS Code
2. Run → Start Debugging (F5)
3. Select "Node.js" environment

**Frontend Debugging:**
1. Install React Developer Tools browser extension
2. Use browser DevTools (F12)
3. Check Network tab for API calls
4. Check Console for errors

### 4. Git Workflow

```bash
# Check status
git status

# Create feature branch
git checkout -b feature/your-feature-name

# Stage changes
git add .

# Commit
git commit -m "feat: add your feature"

# Push
git push origin feature/your-feature-name
```

### 5. Environment-Specific Configuration

**Development:**
- Use `npm run dev` for hot reload
- Enable debug logging
- Use local MongoDB or Atlas free tier

**Production:**
- Set `NODE_ENV=production`
- Use production MongoDB cluster
- Enable security best practices
- Use environment variables for all secrets

### 6. Useful Commands

```bash
# Backend
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production mode
npm test             # Run tests (if configured)

# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Both
npm install <package>  # Add new package
npm update            # Update all packages
npm audit fix         # Fix vulnerabilities
```

### 7. API Testing Workflow

1. Start backend server
2. Use Thunder Client or Postman
3. Test in this order:
   - Register user
   - Login user (save token)
   - Create skill/qualification/interest
   - Generate AI recommendations
   - View recommendations

### 8. Common Development Patterns

**Adding a New API Endpoint:**
1. Create route in `backend/routes/`
2. Create controller in `backend/controllers/`
3. Add to `server.js`
4. Test with API client
5. Add frontend service call in `frontend/src/services/api.js`
6. Use in React component

**Adding a New React Page:**
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Add navigation link in Navbar
4. Test navigation

---

## Project Structure Reference

```
pathfinder-ai/
├── backend/
│   ├── config/         # DB configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth & validation
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── services/       # Grok AI integration
│   ├── utils/          # Helper functions
│   ├── .env            # Environment variables (create this)
│   ├── .gitignore      # Git ignore rules
│   ├── package.json    # Dependencies
│   └── server.js       # Entry point
│
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── assets/     # Images, icons
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React Context
│   │   ├── features/   # Feature modules
│   │   ├── layouts/    # Page layouts
│   │   ├── pages/      # Page components
│   │   ├── services/   # API integration
│   │   ├── utils/      # Helpers
│   │   ├── App.jsx     # Main app
│   │   └── main.jsx    # Entry point
│   ├── .env            # Environment variables (create this)
│   ├── .gitignore      # Git ignore rules
│   ├── package.json    # Dependencies
│   ├── vite.config.js  # Vite configuration
│   └── tailwind.config.cjs # Tailwind config
│
├── docs/               # Documentation
├── replit.md           # Project overview
└── SETUP_GUIDE.md      # This file
```

---

## Additional Resources

### Documentation
- **Express.js:** https://expressjs.com/
- **React:** https://react.dev/
- **MongoDB:** https://docs.mongodb.com/
- **Mongoose:** https://mongoosejs.com/
- **Vite:** https://vitejs.dev/
- **TailwindCSS:** https://tailwindcss.com/
- **xAI Grok API:** https://docs.x.ai/

### Learning Resources
- React Tutorial: https://react.dev/learn
- MongoDB University: https://university.mongodb.com/
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices

---

## Next Steps

1. ✅ Complete setup
2. ✅ Test all features
3. 🔄 Customize UI/UX
4. 🔄 Add more features
5. 🔄 Deploy to production

---

## Getting Help

If you encounter issues:

1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Review console/terminal logs for errors
3. Check backend logs for API errors
4. Verify all environment variables are set
5. Ensure all services are running
6. Check network connectivity

---

**Happy Coding! 🚀**

For questions or issues, refer to the project documentation in the `/docs` folder.
