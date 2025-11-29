// src/features/auth/auth.service.js
import api from '../../services/api';

export const authService = {
  // Register new user
  async register(userData) {
    const response = await api.post('/users/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Login user
  async login(credentials) {
    const response = await api.post('/users/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr || userStr === 'undefined' || userStr === 'null') {
      return null;
    }
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  },

  // Get token
  getToken() {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  },
};
