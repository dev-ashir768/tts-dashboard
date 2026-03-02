export const PUBLIC_ROUTES = {
  AUTH: {
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    VERIFY_OTP: "/signup/verify",
    FORGOT_PASSWORD: "/forgot-password",
  },
} as const;

export const STORAGE_KEYS = {
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
  CUSTOMER: {
    CUSTOMER_LIST: "/customers/list",
    CUSTOMER_STATUS_UPDATE: "/customers/status",
  },
  STAFF: {
    STAFF_LIST: "/staff/list",
    STAFF_STATUS_UPDATE: "/staff/status",
  },
} as const;

export const QUERY_KEYS = {
  USER: {
    USER_BY_ID: "user-by-id",
  },
  CUSTOMER: {
    CUSTOMER_LIST: "customer-list",
  },
  STAFF: {
    STAFF_LIST: "staff-list",
  },
} as const;

export const PROTECTED_ROUTES = {
  DASHBOARD: {
    HOME: "/",
    CUSTOMER: "/customer",
    STAFF: "/staff",
  },
} as const;

export const DEFAULT_VALUES = {
  NOT_AVAILABLE: 'N/A',
} as const;
