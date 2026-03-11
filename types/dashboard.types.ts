import { OrderListType } from "./order.types";
import { CustomerListType } from "./customer.types";

export interface DashboardRequest {
  user_id: number;
  acno: string;
}

export interface OrdersByCountry {
  country: string;
  total_orders: number;
}

export interface OrdersByStatus {
  status_name: string;
  total: number;
}

export interface DashboardPayload {
  role: "super_admin" | "admin" | "customer" | "staff";

  // Universal
  total_orders: number;
  orders_by_status: OrdersByStatus[];
  recent_orders: Partial<OrderListType>[];

  // Admin / Super Admin specific
  orders_by_country?: OrdersByCountry[];
  total_customers?: number;
  total_active_customers?: number;
  total_inactive_customers?: number;
  total_warehouses?: number;
  recent_customers?: Partial<CustomerListType>[];
  total_label_orders: number;
  total_unlabel_orders: number;
}

export interface DashboardResponse {
  status: number;
  message: string;
  payload: DashboardPayload;
}
