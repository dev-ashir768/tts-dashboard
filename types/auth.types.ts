export interface User {
  id: number;
  acno: string;
  full_name: string;
  business_name: string;
  brand_image: string;
  email: string;
  role: string;
  api_key: string;
  otp_verify: number;
  created_date: string;
  status: number;
  is_deleted: number;
}

export interface LoginResponse {
  status: number;
  message: string;
  payload: User[];
}
