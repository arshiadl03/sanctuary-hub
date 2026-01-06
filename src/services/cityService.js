import apiClient from '@/lib/apiClient.js';

/**
 * City Service
 * Handles city-related API calls (Reference: ccity_api_guide.pdf)
 */

export const cityService = {
  /**
   * Get all cities
   * @returns {Promise<Array<{id: number, name: string, province_id: number}>>}
   */
  async getAllCities() {
    try {
      const response = await apiClient.get('/cities/all');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  },

  /**
   * Get cities by province ID
   * @param {number} provinceId
   * @returns {Promise<Array>}
   */
  async getCitiesByProvince(provinceId) {
    try {
      const response = await apiClient.get(`/provinces/${provinceId}/cities`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching cities by province:', error);
      throw error;
    }
  },

  /**
   * Get a single city by ID
   * @param {number} cityId
   * @returns {Promise<Object>}
   */
  async getCityById(cityId) {
    try {
      const response = await apiClient.get(`/cities/${cityId}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching city:', error);
      throw error;
    }
  },
};

export default cityService;
