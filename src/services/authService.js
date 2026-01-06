import apiClient from '@/lib/apiClient.js';

const authService = {
  async login(mobile, password) {
    try {
      const res = await apiClient.post('/login', { mobile, password });
      const { token, user } = res.data;
      if (token) {
        localStorage.setItem('auth_token', token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return { token, user };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Login failed';
      return { error: new Error(message) };
    }
  },

  async register(data) {
    try {
      const payload = {
        name: data.name,
        family: data.family,
        natcode: data.natcode,
        mobile: data.mobile,
        gender: data.gender,
        city_id: data.city_id,
        password: data.password,
      };
      const res = await apiClient.post('/users', payload);
      const { token, user } = res.data;
      if (token) localStorage.setItem('auth_token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Registration failed';
      return { error: new Error(message) };
    }
  },

  async logout() {
    try {
      await apiClient.post('/logout');
    } catch (err) {
      // ignore
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },

  getUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },
};

export default authService;
