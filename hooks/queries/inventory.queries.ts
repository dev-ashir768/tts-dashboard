import { QUERY_KEYS, ROLE } from "@/lib/constants";
import { inventoryService, InventoryListProps } from "@/services/inventory.service";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";

export const useInventoryQuery = {
  InventoryListQuery: (data: InventoryListProps) => {
    const { user } = useAuthStore();
    const isSuperAdmin = user?.role === ROLE.SUPER_ADMIN;

    return useQuery({
      queryKey: [
        QUERY_KEYS.INVENTORY.INVENTORY_LIST,
        ...(data.acno ? [data.acno] : []),
        ...(data.user_id ? [data.user_id] : []),
      ],
      queryFn: () => inventoryService.inventoryList(data),
      enabled: isSuperAdmin && !!data.user_id && !!data.acno,
    });
  },
};
