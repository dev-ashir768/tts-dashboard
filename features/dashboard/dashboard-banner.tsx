"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardBanner = () => {
  const { user } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  if (!isHydrated || !user) {
    return (
      <div className="bg-linear-to-r from-primary to-tertiary/80 rounded-lg p-6 shadow-md text-white flex items-center">
        <div className="space-y-3 w-full max-w-md">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-linear-to-r from-primary to-tertiary/80 rounded-lg p-6 shadow-md text-white flex items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Welcome, {user.full_name}! 👋
          </h2>
          <p className="text-blue-100">
            You are logged in as{" "}
            <span className="font-semibold capitalize">
              {user.role.replaceAll("_", " ")}
            </span>
            . Here is what&apos;s happening today.
          </p>
        </div>
      </div>
    </>
  );
};
