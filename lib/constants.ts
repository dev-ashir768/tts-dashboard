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
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: "/auth/login.php",
    SIGNUP: "/auth/register.php",
    VERIFY_OTP: "/auth/otp.php",
  },
  USER: {
    CHANGE_PASSWORD: "/auth/change_password.php",
    USER_PROFILE: "/profile/update.php",
    USER_BY_ID: "/profile/index.php",
  },
  CUSTOMER: {
    CUSTOMER_LIST: "/customers/list.php",
    CUSTOMER_STATUS_UPDATE: "/customers/status.php",
  },
  STAFF: {
    STAFF_LIST: "/staff/list.php",
    STAFF_STATUS_UPDATE: "/staff/status.php",
    CREATE_STAFF: "/staff/create.php",
  },
  ADMIN: {
    ADMIN_LIST: "/admin/list.php",
  },
  ORDER: {
    ORDER_LIST: "/orders/list.php",
    CREATE_ORDER: "/orders/create.php",
    ORDER_CONFIRM: "/orders/mark_confirm_status.php",
    ORDER_CANCEL: "/orders/mark_cancelled_status.php",
    ORDER_POSTED: "/orders/mark_posted_status.php",

  },
  WAREHOUSE: {
    WAREHOUSE_LIST: "/warehouse/list.php",
    CREATE_WAREHOUSE: "/warehouse/create.php",
  },
  DASHBOARD: {
    INDEX: "/dashboard/index.php",
  },
  INVENTORY: {
    INVENTORY_LIST: "/inventory/list.php",
    CREATE_INVENTORY: "/inventory/create.php",
    UPDATE_INVENTORY: "/inventory/update.php",
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
  ADMIN: {
    ADMIN_LIST: "admin-list",
  },
  ORDER: {
    ORDER_LIST: "order-list",
  },
  WAREHOUSE: {
    WAREHOUSE_LIST: "warehouse-list",
  },
  INVENTORY: {
    INVENTORY_LIST: "inventory-list",
  },
  DASHBOARD: {
    INDEX: "dashboard-index",
  },
} as const;

export const PROTECTED_ROUTES = {
  DASHBOARD: {
    HOME: "/",
    CUSTOMER: "/user-management/customer",
    STAFF: "/user-management/staff",
    ADMIN: "/user-management/admin",
    ORDERS: "/orders",
    WAREHOUSE: "/warehouse/locations",
  },
} as const;

export const DEFAULT_VALUES = {
  NOT_AVAILABLE: "N/A",
} as const;

export const REGEX = {
  FORBIDDEN_CODE:
    /(<\?php|<script|function\s*\(|SELECT\s+|INSERT\s+|UPDATE\s+|DELETE\s+|DROP\s+|CREATE\s+|EXEC\s+|system\(|eval\(|require\(|import\s+|export\s+)/i,
  PHONE:
    /^(?:(?:\+|00)44|0)7(?:[45789]\d{2}|624)\d{6}$|^(?:\+1|1)?\s?\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$|^(\+92|92|0|0092)?(3\d{2}|\d{3})?\d{7}$/,
} as const;

export const ROLE = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  STAFF: "staff",
  CUSTOMER: "customer",
} as const;

export const COUNTRY = {
  UK: "UK",
  US: "US",
} as const;
