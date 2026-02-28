import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { LoginFormValues } from "@/schema/auth.schema";
import { LoginResponse } from "@/types/auth.types";

export const authService = {
  login: async (data: LoginFormValues) => {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data,
    );
    return response;
  },
};
