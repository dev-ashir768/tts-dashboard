import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { InventoryFormValues } from "@/schema/inventory.schema";
import {
  InventoryListResponse,
  CreateInventoryResponse,
  UpdateInventoryProps,
  UpdateInventoryResponse,
} from "@/types/inventory.types";

export interface InventoryListProps {
  user_id: number | null;
  acno: string | null;
}

export const inventoryService = {
  inventoryList: async (
    data: InventoryListProps,
  ): Promise<InventoryListResponse> => {
    const response = await apiClient.post<InventoryListResponse>(
      API_ENDPOINTS.INVENTORY.INVENTORY_LIST,
      data,
    );
    return response.data;
  },

  createInventory: async (
    data: InventoryFormValues,
  ): Promise<CreateInventoryResponse> => {
    const response = await apiClient.post<CreateInventoryResponse>(
      API_ENDPOINTS.INVENTORY.CREATE_INVENTORY,
      data,
    );
    return response.data;
  },

  updateInventory: async (
    data: UpdateInventoryProps,
  ): Promise<UpdateInventoryResponse> => {
    const response = await apiClient.post<UpdateInventoryResponse>(
      API_ENDPOINTS.INVENTORY.UPDATE_INVENTORY,
      data,
    );
    return response.data;
  },
};
