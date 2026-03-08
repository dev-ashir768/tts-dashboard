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
      <div className="bg-card border shadow-xs rounded-xl p-8 flex items-center justify-between relative overflow-hidden">
        <div className="space-y-3 w-full max-w-md">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card border shadow-xs rounded-xl p-8 flex items-center justify-between relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1 text-foreground">
            Welcome back, {user.full_name}! 👋
          </h2>
          <p className="text-muted-foreground mr-8">
            You are logged in as{" "}
            <span className="font-semibold text-foreground capitalize">
              {user.role.replaceAll("_", " ")}
            </span>
            . Here is an overview of your warehouse and delivery operations
            today.
          </p>
        </div>
      </div>
    </>
  );
};
