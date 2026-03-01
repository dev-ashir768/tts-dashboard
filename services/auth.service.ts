import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { SigninFormValues, SignupFormValues, VerifyOTPFormValues } from "@/schema/auth.schema";
import { SigninResponse, SignupResponse, VerifyOTPResponse } from "@/types/auth.types";

export const authService = {
  signin: async (data: SigninFormValues) => {
    const response = await apiClient.post<SigninResponse>(
      API_ENDPOINTS.AUTH.SIGNIN,
      data,
    );
    return response;
  },

  signup: async (data: SignupFormValues) => {
    const response = await apiClient.post<SignupResponse>(
      API_ENDPOINTS.AUTH.SIGNUP,
      data,
    );
    return response;
  },

  verifyOTP: async (data: VerifyOTPFormValues) => {
    const response = await apiClient.post<VerifyOTPResponse>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      data,
    );
    return response;
  },
};
