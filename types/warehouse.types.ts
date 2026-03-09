import { COUNTRY } from "@/lib/constants";

// ====================== Warehouse List ====================== \\
export interface WarehouseListType {
  id: number;
  user_id: number;
  acno: string;
  address: string;
  status: number;
  created_date: string;
  country: (typeof COUNTRY)[keyof typeof COUNTRY];
}

export interface WarehouseListResponse {
  status: number;
  message: string;
  payload: WarehouseListType[];
}

// ====================== Create Warehouse ====================== \\
export interface CreateWarehouseResponse {
  status: number;
  message: string;
  payload: [];
}
