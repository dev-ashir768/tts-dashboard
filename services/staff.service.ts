import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { StaffListResponse } from "@/types/staff.types";

interface customerListProps {
  user_id: number | null;
  acno: string | null;
}

export const staffService = {
  staffList: async (
    data: customerListProps,
  ): Promise<StaffListResponse> => {
    const response = await apiClient.post<StaffListResponse>(
      API_ENDPOINTS.STAFF.STAFF_LIST,
      data,
    );
    return response.data;
  },
};
