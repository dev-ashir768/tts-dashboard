"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

const AppSidebarFooter = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  const handleLogout = () => {
    logout();
    setOpenMobile(false);
    router.push("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleLogout}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-200 cursor-pointer"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AppSidebarFooter;
