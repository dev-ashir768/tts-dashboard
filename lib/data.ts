export const menusData = [
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
    menu_id: 3,
    menu_name: "Staff Portal",
    icon: "Home",
    sorting: 1,
    url: "/staff/dashboard",
    type: "staff",
    parent_id: null,
    children: [],
  },
  {
    menu_id: 4,
    menu_name: "Customer Logs",
    icon: "UserSearch",
    sorting: 2,
    url: "/staff/customers",
    type: "staff",
    parent_id: null,
    children: [],
  },

  {
    menu_id: 5,
    menu_name: "My Dashboard",
    icon: "User",
    sorting: 1,
    url: "/customer/dashboard",
    type: "customer",
    parent_id: null,
    children: [],
  },
  {
    menu_id: 6,
    menu_name: "My Profile",
    icon: "Settings",
    sorting: 2,
    url: "/customer/profile",
    type: "customer",
    parent_id: null,
    children: [],
  }
];