import axios from "axios";

// 🔹 Create axios instance
const api = axios.create({
  baseURL: "https://dsg-1.onrender.com", // Spring Boot backend
  timeout: 15000, // 5 sec
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 REQUEST INTERCEPTOR (JWT attach)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ RESPONSE INTERCEPTOR (GLOBAL ERROR)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // JWT expire / invalid
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
