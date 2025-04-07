import axios from "axios";
import { getAuth, getToken } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:8888/.netlify/functions/",
});

api.interceptors.request.use(
  async (config) => {
    const token = getToken()?.access_token;
    config.headers["Client-ID"] = process.env.REACT_APP_CLIENT_ID;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers['Content-Type']= 'text/plain';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    if (error.response && error.response.status === 401 && originalRequest._retryCount < 1) {
      originalRequest._retryCount += 1;
      try {
        const newToken = await getAuth();
        sessionStorage.setItem("userToken", JSON.stringify(newToken.data));

        originalRequest.headers["Authorization"] = `Bearer ${newToken.data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;