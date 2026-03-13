// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Recommendations from './pages/Recommendations';
import RoadmapPage from './pages/RoadmapPage';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ResumeHistory from './pages/ResumeHistory';
import GoalTracker from './pages/GoalTracker';
import SkillQuiz from './pages/SkillQuiz';
import MarketInsightsPage from './pages/MarketInsightsPage';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Routes */}
            <Route>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="/resume-history" element={<ResumeHistory />} />
              <Route path="/goals" element={<GoalTracker />} />
              <Route path="/quiz" element={<SkillQuiz />} />
              <Route path="/market-insights" element={<MarketInsightsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  );
};

export default App;
