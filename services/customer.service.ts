import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { CustomerListResponse, CustomerStatusUpdateResponse } from "@/types/customer.types";

interface customerListProps {
  user_id: number | null;
  acno: string | null;
}

export interface customerStatusUpdateProps {
  user_id: number | null;
  acno: string | null;
  status: number;
}

export const customerService = {
  customerList: async (
    data: customerListProps,
  ): Promise<CustomerListResponse> => {
    const response = await apiClient.post<CustomerListResponse>(
      API_ENDPOINTS.CUSTOMER.CUSTOMER_LIST,
      data,
    );
    return response.data;
  },

  customerStatusUpdate: async (
    data: customerStatusUpdateProps,
  ): Promise<CustomerStatusUpdateResponse> => {
    const response = await apiClient.post<CustomerStatusUpdateResponse>(
      API_ENDPOINTS.CUSTOMER.CUSTOMER_STATUS_UPDATE,
      data,
    );
    return response.data;
  },
};
