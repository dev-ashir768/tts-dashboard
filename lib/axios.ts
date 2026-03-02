import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { PUBLIC_ROUTES } from "./constants";
import { useAuthStore } from "@/store/auth.store";

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
      const { user: globalUser } = useAuthStore.getState();
      const token = globalUser?.api_key;

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
        const { logout: logoutGlobalUser } = useAuthStore.getState();
        logoutGlobalUser();

        window.location.href = PUBLIC_ROUTES.AUTH.SIGNIN;
      }
    }

    if (error.response?.status === 500) {
      console.error("Server Error: Backend team ko batao");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
