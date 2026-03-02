export interface StaffListType {
  id: number;
  acno: string;
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
