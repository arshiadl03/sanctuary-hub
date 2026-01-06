import axios from "axios";

// Create axios instance for Laravel API
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://example.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Bearer token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 and surface validation errors (Laravel 422)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      // Redirect to login page
      try {
        window.location.href = "/auth";
      } catch (e) {
        // ignore in non-browser contexts
      }
    }

    // If Laravel validation error, attach a `validation` object for callers
    if (status === 422 && error.response?.data) {
      error.validation = error.response.data.errors || error.response.data || null;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
