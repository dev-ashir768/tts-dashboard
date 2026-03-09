import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { DashboardRequest, DashboardResponse } from "@/types/dashboard.types";

export const dashboardService = {
  fetchDashboardData: async (
    data: DashboardRequest,
  ): Promise<DashboardResponse> => {
    const response = await apiClient.post<DashboardResponse>(
      API_ENDPOINTS.DASHBOARD.INDEX,
      data,
    );
    return response.data;
  },
};
