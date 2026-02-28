import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { PUBLIC_ROUTES, STORAGE_KEYS } from "./constants";

// -----------------------------------------------------------------------------
// 1. CREATE INSTANCE
// -----------------------------------------------------------------------------
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// -----------------------------------------------------------------------------
// 2. REQUEST INTERCEPTOR
// -----------------------------------------------------------------------------
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get(STORAGE_KEYS.ACCESS_TOKEN);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// -----------------------------------------------------------------------------
// 3. RESPONSE INTERCEPTOR
// -----------------------------------------------------------------------------
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);

        window.location.href = PUBLIC_ROUTES.AUTH.LOGIN;
      }
    }

    if (error.response?.status === 500) {
      console.error("Server Error: Backend team ko batao");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
