import AuthWrapper from "@/features/auth/auth-wrapper";
import VerifyOtpForm from "@/features/auth/verify-otp-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify OTP",
};

const page = () => {
  return (
    <>
      <AuthWrapper
        title="Verify OTP"
        description="Please enter the OTP sent to your email address"
      >
        <VerifyOtpForm />
      </AuthWrapper>
    </>
  );
};

export default page;
