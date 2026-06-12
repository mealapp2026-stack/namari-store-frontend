import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("namari_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith("/admin")) {
      localStorage.removeItem("namari_token");
      localStorage.removeItem("namari_user");
      if (window.location.pathname !== "/admin/login") window.location.assign("/admin/login");
    }
    return Promise.reject(error);
  },
);

export default api;
