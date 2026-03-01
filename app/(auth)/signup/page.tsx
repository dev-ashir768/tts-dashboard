import AuthWrapper from "@/features/auth/auth-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

const page = () => {
  return (
    <>
      <AuthWrapper />
    </>
  );
};

export default page;
