"use client";

import { DashboardStats } from "./dashboard-stats";
import { DashboardOverviewChart } from "./dashboard-overview-chart";
import { DashboardRecentActivity } from "./dashboard-recent-activity";
import Header from "@/components/shared/header";
import { DashboardBanner } from "./dashboard-banner";
import { useAuthStore } from "@/store/auth.store";
import { useDashboardQuery } from "@/hooks/queries/dashboard.queries";
import EmptyState from "@/components/shared/empty-state";

import { Skeleton } from "@/components/ui/skeleton";

const DashboardWrapper = () => {
  const { user } = useAuthStore();

  const queryData = {
    user_id: user ? Number(user.id) : 0,
    acno: user ? user.acno : "",
  };

  const { data, isLoading, isError } =
    useDashboardQuery.DashboardIndexQuery(queryData);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-2xl" />

        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
          <div className="col-span-3">
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <EmptyState message="Failed to load dashboard data." />
      </div>
    );
  }

  const payload = data?.payload;

  return (
    <>
      <DashboardBanner />

      <Header
        title="Dashboard Overview"
        description="Monitor your 3PL platform metrics, active personnel, and order volume."
      />

      <DashboardStats data={payload} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <DashboardOverviewChart data={payload} />
        </div>
        <DashboardRecentActivity data={payload} />
      </div>
    </>
  );
};

export default DashboardWrapper;
