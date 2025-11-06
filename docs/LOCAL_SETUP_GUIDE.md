# PathFinder AI - Local Development Setup Guide

This guide will help you set up the PathFinder AI project on your local machine using VS Code.

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **MongoDB Atlas Account** (for database)
   - Sign up at: https://www.mongodb.com/cloud/atlas
   - Or install MongoDB locally: https://www.mongodb.com/try/download/community

3. **Google Gemini API Key** (for AI recommendations)
   - Get your API key from: https://makersuite.google.com/app/apikey

4. **VS Code** (recommended IDE)
   - Download from: https://code.visualstudio.com/

5. **Git** (for version control)
   - Download from: https://git-scm.com/

---

## Project Structure

```
pathfinder-ai/
├── backend/              # Express.js backend server
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic & AI services
│   ├── utils/           # Utility functions
│   ├── .env             # Environment variables (not in git)
│   ├── package.json     # Backend dependencies
│   └── server.js        # Backend entry point
│
├── frontend/            # React frontend application
│   ├── public/          # Static assets
│   ├── src/             # React source code
│   │   ├── assets/      # Images, icons
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context providers
│   │   ├── features/    # Feature-specific code
│   │   ├── hooks/       # Custom React hooks
│   │   ├── layouts/     # Layout components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service modules
│   │   ├── styles/      # CSS files
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # React entry point
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
│
└── docs/                # Project documentation
```

---

## Step-by-Step Setup Instructions

### Step 1: Clone or Download the Project

```bash
# Clone the repository (if using Git)
git clone <repository-url>
cd pathfinder-ai

# OR download and extract the ZIP file, then navigate to the project directory
```

### Step 2: Setup Backend

#### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

This will install all the required packages:
- express
- mongoose (MongoDB driver)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (Cross-Origin Resource Sharing)
- dotenv (environment variables)
- @google/generative-ai (Gemini AI SDK)
- morgan (HTTP request logger)
- nodemon (auto-restart during development)

#### 2.2 Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# In backend directory
touch .env
```

Add the following content to `backend/.env`:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/pathfinderAI?retryWrites=true&w=majority

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Google Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here
```

**To get your MongoDB URI:**
1. Log in to MongoDB Atlas
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your credentials
6. Replace `pathfinderAI` with your database name

**To generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### 2.3 Test Backend Server

```bash
# From backend directory
npm start

# For development with auto-restart
npm run dev
```

You should see:
```
Server is running on http://localhost:3000
✅ Connected to MongoDB
```

### Step 3: Setup Frontend

#### 3.1 Install Frontend Dependencies

Open a new terminal window:

```bash
cd frontend
npm install
```

This will install:
- React and React DOM
- React Router
- Vite (build tool)
- TailwindCSS (styling)
- Other development dependencies

#### 3.2 Start Frontend Development Server

```bash
# From frontend directory
npm run dev
```

The frontend will start on: `http://localhost:5000`

You should see:
```
VITE v7.1.7  ready in 582 ms

➜  Local:   http://localhost:5000/
➜  Network: http://xxx.xxx.xxx.xxx:5000/
```

### Step 4: Verify Everything Works

1. **Backend Check:**
   - Navigate to: http://localhost:3000/api/users
   - You should see an empty array or error (endpoint exists)

2. **Frontend Check:**
   - Navigate to: http://localhost:5000
   - You should see the PathFinder AI homepage

3. **Database Check:**
   - Check MongoDB Atlas dashboard
   - Verify connection is active

---

## Running Both Servers Simultaneously

### Option 1: Using Two Terminal Windows

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Option 2: Using Concurrently (Recommended for Development)

Install concurrently in the project root:

```bash
npm install -g concurrently
```

Create a script (optional):

```bash
# From project root, create a start script
concurrently "cd backend && npm start" "cd frontend && npm run dev"
```

---

## VS Code Setup & Extensions

### Recommended VS Code Extensions

1. **ES7+ React/Redux/React-Native snippets** - React code snippets
2. **ESLint** - JavaScript linting
3. **Prettier - Code formatter** - Code formatting
4. **Tailwind CSS IntelliSense** - TailwindCSS autocomplete
5. **MongoDB for VS Code** - MongoDB management
6. **REST Client** or **Thunder Client** - API testing within VS Code
7. **GitLens** - Enhanced Git integration

### VS Code Settings

Create `.vscode/settings.json` in project root:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true
  }
}
```

### Debugging Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "program": "${workspaceFolder}/backend/server.js",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

---

## Common Issues & Solutions

### Issue 1: Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change the port in backend/.env
PORT=3001
```

### Issue 2: MongoDB Connection Failed

**Error:** `MongoDB connection error`

**Solutions:**
1. Check your internet connection
2. Verify MongoDB Atlas credentials
3. Whitelist your IP address in MongoDB Atlas:
   - Go to Network Access
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)

### Issue 3: CORS Errors

**Error:** `Access to fetch at 'http://localhost:3000' has been blocked by CORS policy`

**Solution:**
- Ensure backend CORS is configured correctly
- The backend should already have CORS enabled
- If issues persist, check `backend/server.js` has:
```javascript
app.use(cors());
```

### Issue 4: Gemini API Key Invalid

**Error:** `Failed to generate career recommendations`

**Solutions:**
1. Verify API key is correct in `.env`
2. Check API key has no extra spaces
3. Ensure API key is active in Google AI Studio
4. Check API quota limits

### Issue 5: npm install Fails

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## Development Workflow

### Daily Development Routine

1. **Start your development servers:**
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm run dev
   ```

2. **Make your changes** in VS Code

3. **Test your changes** in the browser at http://localhost:5000

4. **Check backend logs** in Terminal 1 for any errors

5. **Test API endpoints** using Postman or Thunder Client

### Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit with meaningful message
git commit -m "Add feature: XYZ"

# Push to remote
git push origin main
```

---

## Testing the Application

### Manual Testing Steps

1. **Register a New User**
   - Go to: http://localhost:5000/register
   - Fill in the form
   - Check MongoDB to verify user creation

2. **Login**
   - Go to: http://localhost:5000/login
   - Login with created credentials
   - Verify JWT token is stored in localStorage

3. **Add User Data**
   - Add skills
   - Add qualifications
   - Add interests

4. **Generate Recommendations**
   - Click "Generate Career Recommendations"
   - Wait for AI processing (5-15 seconds)
   - Verify recommendations are displayed

---

## Environment-Specific Configuration

### Development Environment
- Backend: http://localhost:3000
- Frontend: http://localhost:5000
- Debug logging enabled
- Hot reload enabled

### Production Environment
- Use environment variables for sensitive data
- Set NODE_ENV=production
- Use production MongoDB cluster
- Enable security middleware
- Configure proper CORS origins

---

## Getting Help

### Resources
- **Express.js Documentation:** https://expressjs.com/
- **React Documentation:** https://react.dev/
- **MongoDB Documentation:** https://docs.mongodb.com/
- **Vite Documentation:** https://vitejs.dev/
- **Google Gemini AI:** https://ai.google.dev/

### Troubleshooting Checklist
- [ ] All dependencies installed?
- [ ] Environment variables configured correctly?
- [ ] MongoDB connection working?
- [ ] Both servers running?
- [ ] No port conflicts?
- [ ] API key valid?
- [ ] Browser console clear of errors?

---

## Next Steps After Setup

1. **Explore the API** - Use Postman to test endpoints (see POSTMAN_API_DOCUMENTATION.md)
2. **Review the Frontend** - Understand the React component structure
3. **Test AI Features** - Generate career recommendations
4. **Customize** - Modify styling, add features
5. **Deploy** - Prepare for production deployment (see deployment guide)

---

**Happy Coding! 🚀**
