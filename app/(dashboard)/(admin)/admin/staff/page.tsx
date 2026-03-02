
import { Metadata } from "next";
import StaffList from "@/features/staff/staff-list";

export const metadata: Metadata = {
  title: "Staff",
};

const page = () => {
  return (
    <>
      <StaffList />
    </>
  );
};

export default page;
