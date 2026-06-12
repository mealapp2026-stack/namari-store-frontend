import axios from "axios";

const normalizeBaseUrl = (value) => {
  const fallback = "http://localhost:5001/api";
  const normalized = (value || fallback)
    .trim()
    .replace(/^(['"])(.*)\1$/, "$2")
    .replace(/\/+$/, "");

  try {
    return new URL(normalized).toString().replace(/\/$/, "");
  } catch {
    console.error(
      "Invalid VITE_API_URL. Use a full URL without quotes, for example https://your-api.onrender.com/api",
    );
    return fallback;
  }
};

const api = axios.create({
  baseURL: normalizeBaseUrl(import.meta.env.VITE_API_URL),
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
