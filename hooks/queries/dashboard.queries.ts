import { QUERY_KEYS } from "@/lib/constants";
import { dashboardService } from "@/services/dashboard.service";
import { DashboardRequest } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

export const useDashboardQuery = {
  DashboardIndexQuery: (data: DashboardRequest) => {
    return useQuery({
      queryKey: [QUERY_KEYS.DASHBOARD.INDEX, data.user_id, data.acno],
      queryFn: () => dashboardService.fetchDashboardData(data),
      enabled: !!data.user_id && !!data.acno,
    });
  },
};
