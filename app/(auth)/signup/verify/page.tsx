import AuthWrapper from "@/features/auth/auth-wrapper";
import SigninForm from "@/features/auth/signin-form";
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
        <SigninForm />
      </AuthWrapper>
    </>
  );
};

export default page;
