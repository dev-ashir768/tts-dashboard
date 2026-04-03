import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";

export const subscriptionService = {
  createCheckoutSession: async (amount: number) => {
    const response = await apiClient.post(API_ENDPOINTS.SUBSCRIPTION.CREATE_CHECKOUT_SESSION, { amount });
    return response.data;
  },
};
