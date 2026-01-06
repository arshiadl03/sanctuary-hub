import apiClient from '@/lib/apiClient.js';

/**
 * Profile Service
 * Handles user profile-related API calls (Reference: ajrena_profile_api_guide.pdf)
 */

export const profileService = {
  /**
   * Get current user profile
   * @returns {Promise<Object>}
   */
  async getProfile() {
    try {
      const response = await apiClient.get('/profile');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   * @param {Object} data - Profile data to update
   * @returns {Promise<Object>}
   */
  async updateProfile(data) {
    try {
      const response = await apiClient.put('/profile', data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  /**
   * Get profile by user ID (admin only)
   * @param {number} userId
   * @returns {Promise<Object>}
   */
  async getProfileById(userId) {
    try {
      const response = await apiClient.get(`/profiles/${userId}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching profile by ID:', error);
      throw error;
    }
  },

  /**
   * Get all profiles (admin only)
   * @param {Object} params - Query parameters (filters, pagination)
   * @returns {Promise<Array>}
   */
  async getAllProfiles(params = {}) {
    try {
      const response = await apiClient.get('/profiles', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },

  /**
   * Update password
   * @param {Object} data - { current_password, new_password, new_password_confirmation }
   * @returns {Promise<void>}
   */
  async updatePassword(data) {
    try {
      await apiClient.put('/profile/password', data);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },
};

export default profileService;
