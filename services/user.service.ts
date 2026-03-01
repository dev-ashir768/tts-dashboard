import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import {
  ChangePasswordFormValues,
  UserProfileFormValues,
} from "@/schema/user.schema";
import { useAuthStore } from "@/store/auth.store";
import {
  ChangePasswordResponse,
  UserByIdResponse,
  UserProfileResponse,
} from "@/types/user.types";

export const userService = {
  changePassword: async (
    data: ChangePasswordFormValues,
  ): Promise<ChangePasswordResponse> => {
    const { user } = useAuthStore.getState();

    const payload = {
      ...data,
      user_id: user?.id,
      acno: user?.acno,
    };

    const response = await apiClient.post<ChangePasswordResponse>(
      API_ENDPOINTS.USER.CHANGE_PASSWORD,
      payload,
    );
    return response.data;
  },

  userProfile: async (
    data: UserProfileFormValues,
  ): Promise<UserProfileResponse> => {
    const { user } = useAuthStore.getState();

    const payload = {
      ...data,
      user_id: user?.id,
      acno: user?.acno,
    };

    const response = await apiClient.post<UserProfileResponse>(
      API_ENDPOINTS.USER.USER_PROFILE,
      payload,
    );
    return response.data;
  },

  userById: async ({
    user_id,
    acno,
  }: {
    user_id: number | null;
    acno: string | null;
  }): Promise<UserByIdResponse> => {
    const payload = {
      user_id,
      acno,
    };

    const response = await apiClient.get<UserByIdResponse>(
      API_ENDPOINTS.USER.USER_BY_ID,
      { data: payload },
    );
    return response.data;
  },
};
