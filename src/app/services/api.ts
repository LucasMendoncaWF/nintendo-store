import axios from "axios";
import { getAuth, getToken } from "./authService";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = getToken()?.access_token;
    if (token) {
    if(config.url?.includes('igdb')) {
      config.headers["Client-ID"] = process.env.REACT_APP_CLIENT_ID;
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers['Content-Type']= 'text/plain';

    }else
      config.headers['Content-Type']= 'application/json';
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