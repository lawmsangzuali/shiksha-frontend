import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;
    const isRefreshCall = originalRequest.url?.includes("/refresh/");
    const isMeCall = originalRequest.url?.includes("/me/");

    if (isUnauthorized && isMeCall) {
      return Promise.reject(error);
    }

    if (isUnauthorized && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        await api.post("/api/accounts/refresh/");
        return api(originalRequest);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;