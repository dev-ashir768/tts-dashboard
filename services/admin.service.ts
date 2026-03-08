import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { AdminListResponse } from "@/types/admin.types";

interface adminListProps {
  user_id: number | null;
  acno: string | null;
}

export const adminService = {
  adminList: async (
    data: adminListProps,
  ): Promise<AdminListResponse> => {
    const response = await apiClient.post<AdminListResponse>(
      API_ENDPOINTS.ADMIN.ADMIN_LIST,
      data,
    );
    return response.data;
  },
};
