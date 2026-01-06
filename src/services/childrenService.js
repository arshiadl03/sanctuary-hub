import apiClient from '@/lib/apiClient.js';

/**
 * Children Service
 * Handles children (students) related API calls
 */

export const childrenService = {
  /**
   * Get all children (with optional filters)
   * @param {Object} params - Query parameters (parent_id, mahfil_id, etc.)
   * @returns {Promise<Array>}
   */
  async getChildren(params = {}) {
    try {
      const response = await apiClient.get('/children', { params });
      return response.data.data || response.data || [];
    } catch (error) {
      console.error('Error fetching children:', error);
      throw error;
    }
  },

  /**
   * Get child by ID
   * @param {number} childId
   * @returns {Promise<Object>}
   */
  async getChildById(childId) {
    try {
      const response = await apiClient.get(`/children/${childId}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching child:', error);
      throw error;
    }
  },

  /**
   * Create a new child
   * @param {Object} data - Child data
   * @returns {Promise<Object>}
   */
  async createChild(data) {
    try {
      const response = await apiClient.post('/children', data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating child:', error);
      throw error;
    }
  },

  /**
   * Update child
   * @param {number} childId
   * @param {Object} data - Updated child data
   * @returns {Promise<Object>}
   */
  async updateChild(childId, data) {
    try {
      const response = await apiClient.put(`/children/${childId}`, data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating child:', error);
      throw error;
    }
  },

  /**
   * Delete child
   * @param {number} childId
   * @returns {Promise<void>}
   */
  async deleteChild(childId) {
    try {
      await apiClient.delete(`/children/${childId}`);
    } catch (error) {
      console.error('Error deleting child:', error);
      throw error;
    }
  },
};

export default childrenService;
