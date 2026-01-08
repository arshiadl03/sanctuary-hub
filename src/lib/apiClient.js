import axios from "axios";

// Create axios instance for Laravel API
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api", // URL پیش‌فرض اگر متغیر محیطی تنظیم نشده باشد
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // درخواست‌ها بعد از 10 ثانیه timeout می‌شوند
  withCredentials: true, // برای ارسال کوکی‌ها با درخواست‌ها
});

// Attach Bearer token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token"); // توکن را از localStorage می‌خوانیم
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`; // توکن را به هدر اضافه می‌کنیم
    }
    return config;
  },
  (error) => {
    console.error("Request error: ", error); // خطای درخواست را در کنسول ثبت می‌کنیم
    return Promise.reject(error);
  }
);

// Response interceptor: handle 401, 403, and surface validation errors (Laravel 422)
apiClient.interceptors.response.use(
  (response) => response, // اگر پاسخ موفق بود، آن را برمی‌گردانیم
  async (error) => {
    const status = error?.response?.status;
    
    // Handle Unauthorized (401)
    if (status === 401) {
      console.log("Unauthorized access - Redirecting to login.");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      try {
        window.location.href = "/auth"; // هدایت کاربر به صفحه ورود
      } catch (e) {
        console.error("Error during redirect: ", e);
      }
    }
    
    // Handle Forbidden (403)
    if (status === 403) {
      console.error("Access Forbidden - You do not have permission to access this resource.");
      // نمایش پیام خطا به کاربر (مثلاً با استفاده از Toast یا Modal)
    }

    // If Laravel validation error, attach a `validation` object for callers (422)
    if (status === 422 && error.response?.data) {
      error.validation = error.response.data.errors || error.response.data || null;
    }

    // Display detailed error message in console for debugging
    console.error("API Error: ", error.response || error.message);

    return Promise.reject(error); // رَد کردن درخواست با خطا
  }
);

export default apiClient;
