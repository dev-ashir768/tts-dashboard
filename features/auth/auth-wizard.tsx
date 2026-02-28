"use client";

import LoginForm from "./login-form";
import { Blocks } from "lucide-react";

const AuthWizard = () => {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-5">
        <div
          style={{
            backgroundImage: "url('/images/auth/auth-bg.jpg')",
          }}
          className="relative hidden lg:flex col-span-3 bg-cover bg-center bg-no-repeat"
        />
        <div className="flex items-center justify-center w-full col-span-2">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center gap-3 w-full mb-6">
              <div className="bg-primary text-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                <Blocks className="size-5" />
              </div>
              <h1 className="text-center text-4xl font-bold">
                Login to your account
              </h1>
              <p className="text-center text-base text-muted-foreground">
                Welcome to the TTS Dashboard
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthWizard;
