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

export interface SigninResponse {
  status: number;
  message: string;
  payload: User[];
}

export interface SignupResponse {
  status: number;
  message: string;
  payload: User[];
}

export interface VerifyOTPResponse {
  status: number;
  message: string;
  payload: User[];
}
