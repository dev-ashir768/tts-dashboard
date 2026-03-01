export const PUBLIC_ROUTES = {
  AUTH: {
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    VERIFY_OTP: "/signup/verify",
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
    CHANGE_PASSWORD: "/auth/change_password",
    USER_PROFILE: "/profile/update",
    USER_BY_ID: "/profile/index",
  },
} as const;

export const QUERY_KEYS = {
  USER: {
    USER_BY_ID: "user-by-id",
  },
} as const;

export const PROTECTED_ROUTES = {
  DASHBOARD: {
    HOME: "/",
    ORDERS: "/orders",
  },
} as const;
