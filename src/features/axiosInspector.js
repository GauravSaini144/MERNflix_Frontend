import axios from "axios";
import store from "../store/store.js"
import { refreshToken } from "./user/userApi";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// Add interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh API via Redux
        await store.dispatch(refreshToken());

        const state = store.getState();
        const newToken = state.User.user?.accessToken;

        // Retry request with new token
        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh failed, logging out...");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
