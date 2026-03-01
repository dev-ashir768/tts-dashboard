import AuthWrapper from "@/features/auth/auth-wrapper";
import SigninForm from "@/features/auth/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};
const page = () => {
  return (
    <>
      <AuthWrapper title="Sign in" description="Welcome to the TTS Dashboard">
        <SigninForm />
      </AuthWrapper>
    </>
  );
};

export default page;
