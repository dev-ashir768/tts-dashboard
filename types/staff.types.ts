import { COUNTRY } from "@/lib/constants";

// ====================== Staff List ====================== \\
export interface StaffListType {
  id: number;
  acno: string;
  full_name: string;
  email: string;
  contact_no: string;
  country: (typeof COUNTRY)[keyof typeof COUNTRY];
  status: number;
}

export interface StaffListResponse {
  status: number;
  message: string;
  payload: StaffListType[];
}

// ====================== Create Staff ====================== \\
export interface CreateStaffResponse {
  status: number;
  message: string;
  payload: {
    user_id: string;
    acno: string;
  };
}

// ====================== Update Staff Status ====================== \\
export interface StaffStatusUpdateResponse {
  status: number;
  message: string;
  payload: [];
}
