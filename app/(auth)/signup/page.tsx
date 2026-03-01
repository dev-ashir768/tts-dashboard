import AuthWrapper from "@/features/auth/auth-wrapper";
import SignupForm from "@/features/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

const page = () => {
  return (
    <>
      <AuthWrapper title="Sign up" description="Welcome to the TTS Dashboard">
        <SignupForm />
      </AuthWrapper>
    </>
  );
};

export default page;
