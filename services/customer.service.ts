import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { CustomerListResponse } from "@/types/customer.types";

export const customerService = {

  customerList: async (): Promise<CustomerListResponse> => {
    const response = await apiClient.get<CustomerListResponse>(
      API_ENDPOINTS.CUSTOMER.CUSTOMER_LIST,
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
