import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { CustomerListResponse } from "@/types/customer.types";

interface customerListProps {
  user_id: number | null;
  acno: string | null;
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

  //   customerById: async ({
  //     user_id,
  //     acno,
  //   }: {
  //     user_id: number | null;
  //     acno: string | null;
  //   }): Promise<UserByIdResponse> => {
  //     const payload = {
  //       user_id,
  //       acno,
  //     };

  //     const response = await apiClient.get<UserByIdResponse>(
  //       API_ENDPOINTS.USER.USER_BY_ID,
  //       { data: payload },
  //     );
  //     return response.data;
  //   },
};
