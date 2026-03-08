import CustomerList from "@/features/customer/customer-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer",
};

const CustomerPage = () => {
  return <CustomerList />;
};

export default CustomerPage;
