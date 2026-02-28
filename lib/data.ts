export const menusData = [
  // ==================== ADMIN SECTION ====================
  {
    menu_id: 1,
    menu_name: "Admin Dashboard",
    icon: "LayoutDashboard",
    sorting: 1,
    url: "/admin/dashboard",
    type: "admin",
    parent_id: null,
    children: [],
  },
  {
    menu_id: 2,
    menu_name: "User Management",
    icon: "Users",
    sorting: 2,
    url: "/admin/users",
    type: "admin",
    parent_id: null,
    children: [
      {
        menu_id: 21,
        menu_name: "All Users",
        url: "/admin/users/all",
        type: "admin",
      },
      {
        menu_id: 22,
        menu_name: "Roles & Permissions",
        url: "/admin/users/permissions",
        type: "admin",
      }
    ],
  },
  {
    menu_id: 7,
    menu_name: "Warehouse Settings",
    icon: "Warehouse",
    sorting: 3,
    url: "/admin/warehouse",
    type: "admin",
    parent_id: null,
    children: [
      { menu_id: 71, menu_name: "Location Mapping", url: "/admin/warehouse/locations", type: "admin" },
      { menu_id: 72, menu_name: "Carrier Integration", url: "/admin/warehouse/carriers", type: "admin" }
    ],
  },

  // ==================== STAFF PORTAL (Operations) ====================
  {
    menu_id: 3,
    menu_name: "Operations Desk",
    icon: "Home",
    sorting: 1,
    url: "/staff/dashboard",
    type: "staff",
    parent_id: null,
    children: [],
  },
  {
    menu_id: 8,
    menu_name: "Inventory Control",
    icon: "Package",
    sorting: 2,
    url: "/staff/inventory",
    type: "staff",
    parent_id: null,
    children: [
      { menu_id: 81, menu_name: "Stock List", url: "/staff/inventory/list", type: "staff" },
      { menu_id: 82, menu_name: "Adjustments", url: "/staff/inventory/adjust", type: "staff" }
    ],
  },
  {
    menu_id: 9,
    menu_name: "Inbound (Receiving)",
    icon: "Download",
    sorting: 3,
    url: "/staff/inbound",
    type: "staff",
    parent_id: null,
    children: [
      { menu_id: 91, menu_name: "Pending ASNs", url: "/staff/inbound/pending", type: "staff" },
      { menu_id: 92, menu_name: "Receive Goods", url: "/staff/inbound/receive", type: "staff" }
    ],
  },
  {
    menu_id: 10,
    menu_name: "Outbound (Fulfillment)",
    icon: "Truck",
    sorting: 4,
    url: "/staff/outbound",
    type: "staff",
    parent_id: null,
    children: [
      { menu_id: 101, menu_name: "Pick & Pack", url: "/staff/outbound/pick", type: "staff" },
      { menu_id: 102, menu_name: "Shipping Labels", url: "/staff/outbound/labels", type: "staff" }
    ],
  },

  // ==================== CUSTOMER PORTAL ====================
  {
    menu_id: 5,
    menu_name: "My Dashboard",
    icon: "BarChart3",
    sorting: 1,
    url: "/customer/dashboard",
    type: "customer",
    parent_id: null,
    children: [],
  },
  {
    menu_id: 11,
    menu_name: "Order Management",
    icon: "ShoppingCart",
    sorting: 2,
    url: "/customer/orders",
    type: "customer",
    parent_id: null,
    children: [
      { menu_id: 111, menu_name: "Create New Order", url: "/customer/orders/new", type: "customer" },
      { menu_id: 112, menu_name: "Order History", url: "/customer/orders/history", type: "customer" }
    ],
  },
  {
    menu_id: 12,
    menu_name: "Billing & Invoices",
    icon: "CreditCard",
    sorting: 3,
    url: "/customer/billing",
    type: "customer",
    parent_id: null,
    children: [],
  },
  {
    menu_id: 6,
    menu_name: "Settings",
    icon: "Settings",
    sorting: 4,
    url: "/customer/profile",
    type: "customer",
    parent_id: null,
    children: [],
  }
];