import { COUNTRY } from "@/lib/constants";

// ====================== Order List ====================== \\
export interface OrderListType {
  order_id: number;
  acno: string;
  user_id: string;
  tracking_id: string;
  asin_id: string;
  status_name: string;
  full_name: string;
  remarks: string;
  consignee_address: string;
  shipper_address: string;
  label_pdf: string;
  label_image?: string[];
  country: (typeof COUNTRY)[keyof typeof COUNTRY];
  created_date: string;
}

export interface OrderListResponse {
  status: number;
  message: string;
  payload: OrderListType[];
}

// ====================== Create Order ====================== \\
export interface CreateOrderResponse {
  status: number;
  message: string;
  payload: { order_id: string };
}

// ====================== Update Order Status ====================== \\
export interface UpdateOrderStatusRequest {
  order_id: number;
  user_id: number;
  acno: string;
  parent_id: number;
  parent_acno: string;
}

export interface UpdateOrderStatusResponse {
  status: number;
  message: string;
  payload: [];
}
