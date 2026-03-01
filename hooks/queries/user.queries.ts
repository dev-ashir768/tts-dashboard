import { QUERY_KEYS } from "@/lib/constants";
import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

interface UserByIdQueryProps {
  user_id: number | null;
  acno: string | null;
}

export const useUserQuery = {
  UserByIdQuery: (data: UserByIdQueryProps) => {
    return useQuery({
      queryKey: [
        QUERY_KEYS.USER.USER_BY_ID,
        ...(data.acno ? [data.acno] : []),
        ...(data.user_id ? [data.user_id] : []),
      ],
      queryFn: () => userService.userById(data),
      enabled: !!data.user_id && !!data.acno,
    });
  },
};
