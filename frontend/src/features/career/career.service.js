// src/features/career/career.service.js
import api from '../../services/api';

export const careerService = {
  // Get all recommendations for a user
  async getRecommendations(userId) {
    const response = await api.get(`/recommendations/user/${userId}`);
    return response.data;
  },

  // Generate new recommendations
  async generateRecommendations(userId) {
    const response = await api.post(`/recommendations/generate/${userId}`);
    return response.data;
  },

  // Delete a recommendation
  async deleteRecommendation(recommendationId) {
    const response = await api.delete(`/recommendations/${recommendationId}`);
    return response.data;
  },

  // Get recommendation by ID
  async getRecommendationById(recommendationId) {
    const response = await api.get(`/recommendations/${recommendationId}`);
    return response.data;
  },
};
