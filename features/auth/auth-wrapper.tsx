"use client";

import LoginForm from "./login-form";
import { Blocks } from "lucide-react";

const AuthWrapper = () => {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-5">
        <div className="relative hidden lg:flex col-span-3 justify-between items-center bg-cover bg-center bg-no-repeat bg-linear-to-b from-primary to-tertiary">
          <div
            style={{
              backgroundImage: "url('/images/auth/auth-bg.png')",
            }}
            className="bg-no-repeat bg-contain bg-center absolute w-full h-[70%]"
          />
          <div>
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-secondary/10 pointer-events-none absolute bottom-0 -right-35 size-96"
            >
              <path
                d="M63.6734 24.8486V49.3899C63.6734 57.4589 57.1322 64.0001 49.0632 64.0001H25.2041"
                stroke="currentColor"
                strokeWidth="8.11681"
              ></path>
              <path
                d="M64.3266 103.152L64.3266 78.6106C64.3266 70.5416 70.8678 64.0003 78.9368 64.0003L102.796 64.0004"
                stroke="currentColor"
                stroke-width="8.11681"
              ></path>
              <line
                x1="93.3468"
                y1="35.6108"
                x2="76.555"
                y2="52.205"
                stroke="currentColor"
                stroke-width="8.11681"
              ></line>
              <line
                x1="51.7697"
                y1="77.0624"
                x2="34.9778"
                y2="93.6567"
                stroke="currentColor"
                stroke-width="8.11681"
              ></line>
              <line
                x1="50.9584"
                y1="51.3189"
                x2="34.2651"
                y2="34.6256"
                stroke="currentColor"
                stroke-width="8.11681"
              ></line>
              <line
                x1="93.1625"
                y1="93.6397"
                x2="76.4692"
                y2="76.9464"
                stroke="currentColor"
                stroke-width="8.11681"
              ></line>
            </svg>
          </div>
        </div>
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

export default AuthWrapper;
