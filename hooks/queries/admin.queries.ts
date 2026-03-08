import { QUERY_KEYS } from "@/lib/constants";
import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

interface AdminListQueryProps {
  user_id: number | null;
  acno: string | null;
}

export const useAdminQuery = {
  AdminListQuery: (data: AdminListQueryProps) => {
    return useQuery({
      queryKey: [
        QUERY_KEYS.ADMIN.ADMIN_LIST,
        ...(data.acno ? [data.acno] : []),
        ...(data.user_id ? [data.user_id] : []),
      ],
      queryFn: () => adminService.adminList(data),
      enabled: !!data.user_id && !!data.acno,
    });
  },
};
