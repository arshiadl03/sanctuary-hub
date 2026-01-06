import apiClient from '@/lib/apiClient.js';

/**
 * Mahfel Service
 * Handles mahfel (circle/assembly) related API calls (Reference: mahfel_aapi_guide.pdf)
 */

export const mahfelService = {
  /**
   * Get all mahfels
   * @returns {Promise<Array>}
   */
  async getMahfels() {
    try {
      const response = await apiClient.get('/mahfels');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching mahfels:', error);
      throw error;
    }
  },

  /**
   * Get mahfel by ID
   * @param {number} mahfelId
   * @returns {Promise<Object>}
   */
  async getMahfelById(mahfelId) {
    try {
      const response = await apiClient.get(`/mahfels/${mahfelId}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching mahfel:', error);
      throw error;
    }
  },

  /**
   * Get mahfels for current user
   * @returns {Promise<Array>}
   */
  async getUserMahfels() {
    try {
      const response = await apiClient.get('/user/mahfels');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching user mahfels:', error);
      throw error;
    }
  },

  /**
   * Create a new mahfel
   * @param {Object} data - Mahfel data
   * @returns {Promise<Object>}
   */
  async createMahfel(data) {
    try {
      const response = await apiClient.post('/mahfels', data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating mahfel:', error);
      throw error;
    }
  },

  /**
   * Update mahfel
   * @param {number} mahfelId
   * @param {Object} data - Updated mahfel data
   * @returns {Promise<Object>}
   */
  async updateMahfel(mahfelId, data) {
    try {
      const response = await apiClient.put(`/mahfels/${mahfelId}`, data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating mahfel:', error);
      throw error;
    }
  },

  /**
   * Delete mahfel
   * @param {number} mahfelId
   * @returns {Promise<void>}
   */
  async deleteMahfel(mahfelId) {
    try {
      await apiClient.delete(`/mahfels/${mahfelId}`);
    } catch (error) {
      console.error('Error deleting mahfel:', error);
      throw error;
    }
  },
};

export default mahfelService;
