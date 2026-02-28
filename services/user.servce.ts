import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { ChangePasswordFormValues } from "@/schema/user.schema";
import { ChangePasswordResponse } from "@/types/user.types";

export const userService = {
  changePassword: async (data: ChangePasswordFormValues) => {
    const response = await apiClient.post<ChangePasswordResponse>(
      API_ENDPOINTS.USER.CHANGE_PASSWORD,
      data,
    );
    return response;
  },
};
