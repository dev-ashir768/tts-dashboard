import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { WarehouseFormValues } from "@/schema/warehouse.schema";
import { WarehouseListResponse } from "@/types/warehouse.types";

interface warehouseListProps {
  user_id: number | null;
  acno: string | null;
}

export const warehouseService = {
  warehouseList: async (
    data: warehouseListProps,
  ): Promise<WarehouseListResponse> => {
    const response = await apiClient.post<WarehouseListResponse>(
      API_ENDPOINTS.WAREHOUSE.WAREHOUSE_LIST,
      data,
    );
    return response.data;
  },
  createWarehouse: async (
    data: WarehouseFormValues,
  ) => {
    const response = await apiClient.post(
      API_ENDPOINTS.WAREHOUSE.CREATE_WAREHOUSE,
      data,
    );
    return response.data;
  },
};
