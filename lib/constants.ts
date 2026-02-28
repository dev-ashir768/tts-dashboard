export const PUBLIC_ROUTES = {
  AUTH: {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
  },
  PMS: {
    DASHBOARD: "/login",
    ORDERS: "/forgot-password",
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  AUTH_STATE: "auth-storage",
  THEME: "ui-theme",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    VERIFY_OTP: "/api/auth/verify-otp",
  },
  USER: {
    CHANGE_PASSWORD: "/auth/change-password",
  },
} as const;

export const PROTECTED_ROUTES = {
  DASHBOARD: {
    HOME: "/",
    ORDERS: "/orders",
  },
} as const;
