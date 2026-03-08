import AdminList from "@/features/admin/admin-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

const AdminPage = () => {
  return <AdminList />;
};

export default AdminPage;
