import { COUNTRY } from "@/lib/constants";

export interface AdminListType {
  id: number;
  acno: string;
  full_name: string;
  email: string;
  contact_no: string;
  country: (typeof COUNTRY)[keyof typeof COUNTRY];
}

export interface AdminListResponse {
  status: number;
  message: string;
  payload: AdminListType[];
}
