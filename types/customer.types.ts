import { COUNTRY } from "@/lib/constants";

export interface CustomerListType {
  id: number;
  acno: string;
  full_name: string;
  email: string;
  contact_no: string;
  business_name: string | null;
  address: string | null;
  country: (typeof COUNTRY)[keyof typeof COUNTRY];
  status: number;
}

export interface CustomerListResponse {
  status: number;
  message: string;
  payload: CustomerListType[];
}

export interface CustomerStatusUpdateResponse {
  status: number;
  message: string;
  payload: [];
}