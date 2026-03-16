import { COUNTRY } from "@/lib/constants";

// ====================== Inventory List ====================== \\
export interface InventoryListType {
  id: number;
  user_id: number;
  acno: string;
  country: (typeof COUNTRY)[keyof typeof COUNTRY];
  warehouse_id: number;
  sku_name: string;
  sku_code: string;
  quantity: number;
  amount: string;
  description: string;
  image: string;
  status: number;
  created_date: string;
}

export interface InventoryListResponse {
  status: number;
  message: string;
  payload: InventoryListType[];
}

// ====================== Create Inventory ====================== \\
export interface CreateInventoryResponse {
  status: number;
  message: string;
  payload: [];
}


// ====================== Update Inventory ====================== \\
export interface UpdateInventoryResponse {
  status: number;
  message: string;
  payload: [];
}

export interface UpdateInventoryProps {
  user_id: number;
  acno: string;
  sku_id: number;
  quantity: number;
  status: number;
}