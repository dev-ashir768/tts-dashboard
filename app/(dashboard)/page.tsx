
import DashboardWrapper from "@/features/dashboard/dashboard-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Home() {
  return (
   <DashboardWrapper />
  );
}
