import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { StaffFormValues } from "@/schema/staff.schema";
import {
  CreateStaffResponse,
  StaffListResponse,
  StaffStatusUpdateResponse,
} from "@/types/staff.types";

interface customerListProps {
  user_id: number | null;
  acno: string | null;
}

export interface staffStatusUpdateProps {
  user_id: number | null;
  acno: string | null;
  status: number;
}

export const staffService = {
  staffList: async (data: customerListProps): Promise<StaffListResponse> => {
    const response = await apiClient.post<StaffListResponse>(
      API_ENDPOINTS.STAFF.STAFF_LIST,
      data,
    );
    return response.data;
  },

  staffStatusUpdate: async (
    data: staffStatusUpdateProps,
  ): Promise<StaffStatusUpdateResponse> => {
    const response = await apiClient.post<StaffStatusUpdateResponse>(
      API_ENDPOINTS.STAFF.STAFF_STATUS_UPDATE,
      data,
    );
    return response.data;
  },

  createStaff: async (data: StaffFormValues): Promise<CreateStaffResponse> => {
    const response = await apiClient.post<CreateStaffResponse>(
      API_ENDPOINTS.STAFF.CREATE_STAFF,
      data,
    );
    return response.data;
  },
};
