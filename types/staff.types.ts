// ====================== Staff List ====================== \\
export interface StaffListType {
  acno: string;
  id: number;
  full_name: string;
  email: string;
  contact_no: string;
  business_name: null;
  address: null;
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
