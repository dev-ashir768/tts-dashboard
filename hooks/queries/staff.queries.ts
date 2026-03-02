import { QUERY_KEYS } from "@/lib/constants";
import { staffService } from "@/services/staff.service";
import { useQuery } from "@tanstack/react-query";

interface StaffListQueryProps {
  user_id: number | null;
  acno: string | null;
}

export const useStaffQuery = {
  StaffListQuery: (data: StaffListQueryProps) => {
    return useQuery({
      queryKey: [
        QUERY_KEYS.STAFF.STAFF_LIST,
        ...(data.acno ? [data.acno] : []),
        ...(data.user_id ? [data.user_id] : []),
      ],
      queryFn: () => staffService.staffList(data),
      enabled: !!data.user_id && !!data.acno,
    });
  },
};
