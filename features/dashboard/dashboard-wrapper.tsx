import React from "react";
import { DashboardStats } from "./dashboard-stats";
import { DashboardOverviewChart } from "./dashboard-overview-chart";
import { DashboardRecentActivity } from "./dashboard-recent-activity";
import { DashboardBookings } from "./dashboard-bookings";
import Header from "@/components/shared/header";

const DashboardWrapper = () => {
  return (
    <>
      <Header
        title="Dashboard Overview"
        description="Monitor your 3PL platform metrics, active personnel, and order volume."
      />

      <DashboardStats />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <DashboardOverviewChart />
        </div>
        {/* Recent Activity / CN Status Feed */}
        <DashboardRecentActivity />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DashboardBookings />
        <div className="col-span-3">
          {/* Added a placeholder for alignment parity if needed later, could put notifications here */}
        </div>
      </div>
    </>
  );
};

export default DashboardWrapper;
