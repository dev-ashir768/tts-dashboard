export interface CustomerListType {
  id: number;
  acno: string;
  full_name: string;
  email: string;
  contact_no: string;
  business_name: string | null;
  address: string | null;
  status: number;
}

export interface CustomerListResponse {
  status: number;
  message: string;
  payload: CustomerListType[];
}
