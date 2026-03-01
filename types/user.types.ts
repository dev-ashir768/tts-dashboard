export interface ChangePasswordResponse {
  status: number;
  message: string;
  payload: [];
}

export interface UserProfileResponse {
  status: number;
  message: string;
  payload: {
    id: number;
    acno: string;
    full_name: string;
    email: string;
    contact_no: string;
    business_name: string;
    brand_image: string;
    address: string;
  };
}

export interface UserByIdResponse {
  status: number;
  message: string;
  payload: {
    id: number;
    acno: string;
    full_name: string;
    email: string;
    contact_no: string;
    business_name: string;
    brand_image: string;
    address: string;
    api_key: string;
    role: string;
  }[];
}
