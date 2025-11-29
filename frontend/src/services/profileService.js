// src/services/profileService.js
import api from './api';

export const profileService = {
  // Skills
  async getSkills(userId) {
    const response = await api.get(`/skills/user/${userId}`);
    return response.data;
  },

  async addSkill(skillData) {
    const response = await api.post('/skills', skillData);
    return response.data;
  },

  async updateSkill(skillId, skillData) {
    const response = await api.put(`/skills/${skillId}`, skillData);
    return response.data;
  },

  async deleteSkill(skillId) {
    const response = await api.delete(`/skills/${skillId}`);
    return response.data;
  },

  // Qualifications
  async getQualifications(userId) {
    const response = await api.get(`/qualifications/user/${userId}`);
    return response.data;
  },

  async addQualification(qualData) {
    const response = await api.post('/qualifications', qualData);
    return response.data;
  },

  async updateQualification(qualId, qualData) {
    const response = await api.put(`/qualifications/${qualId}`, qualData);
    return response.data;
  },

  async deleteQualification(qualId) {
    const response = await api.delete(`/qualifications/${qualId}`);
    return response.data;
  },

  // Interests
  async getInterests(userId) {
    const response = await api.get(`/interests/user/${userId}`);
    return response.data;
  },

  async addInterest(interestData) {
    const response = await api.post('/interests', interestData);
    return response.data;
  },

  async updateInterest(interestId, interestData) {
    const response = await api.put(`/interests/${interestId}`, interestData);
    return response.data;
  },

  async deleteInterest(interestId) {
    const response = await api.delete(`/interests/${interestId}`);
    return response.data;
  },
};
