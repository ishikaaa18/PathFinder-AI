import apiClient from './apiClient';

export const authApi = {
  register: (userData) => apiClient.post('/users/register', userData),
  login: (credentials) => apiClient.post('/users/login', credentials),
  getProfile: (userId) => apiClient.get(`/users/${userId}`),
  updateProfile: (userId, data) => apiClient.put(`/users/${userId}`, data),
};

export const skillsApi = {
  create: (skillData) => apiClient.post('/skills', skillData),
  getByUser: (userId) => apiClient.get(`/skills/user/${userId}`),
  update: (id, data) => apiClient.put(`/skills/${id}`, data),
  delete: (id) => apiClient.delete(`/skills/${id}`),
};

export const qualificationsApi = {
  create: (data) => apiClient.post('/qualifications', data),
  getByUser: (userId) => apiClient.get(`/qualifications/user/${userId}`),
  update: (id, data) => apiClient.put(`/qualifications/${id}`, data),
  delete: (id) => apiClient.delete(`/qualifications/${id}`),
};

export const interestsApi = {
  create: (data) => apiClient.post('/interests', data),
  getByUser: (userId) => apiClient.get(`/interests/user/${userId}`),
  update: (id, data) => apiClient.put(`/interests/${id}`, data),
  delete: (id) => apiClient.delete(`/interests/${id}`),
};

export const recommendationsApi = {
  generate: (userId) => apiClient.post(`/recommendations/generate/${userId}`),
  getByUser: (userId) => apiClient.get(`/recommendations/user/${userId}`),
  getById: (id) => apiClient.get(`/recommendations/${id}`),
};
