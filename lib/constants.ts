export const PUBLIC_ROUTES = {
  AUTH: {
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    VERIFY_OTP: "/signup/verify-otp",
    FORGOT_PASSWORD: "/forgot-password",
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  AUTH_STATE: "auth-storage",
  THEME: "ui-theme",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: "/auth/login",
    SIGNUP: "/auth/register",
    VERIFY_OTP: "/auth/otp",
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
