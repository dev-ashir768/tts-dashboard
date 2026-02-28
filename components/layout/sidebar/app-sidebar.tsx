"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import AppSidebarHeader from "./app-sidebar-header";
import AppSidebarFooter from "./app-sidebar-footer";
import AppSidebarContent from "./app-sidebar-content";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { open } = useSidebar();

  return (
    <>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        {...props}
        className="border-none shadow-lg"
      >
        <SidebarHeader className="border-b h-16! transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12!">
          <AppSidebarHeader />
        </SidebarHeader>
        <SidebarContent>
          <AppSidebarContent />
        </SidebarContent>
        {open && (
          <SidebarFooter>
            <AppSidebarFooter />
          </SidebarFooter>
        )}
        <SidebarRail />
      </Sidebar>
    </>
  );
};

export default AppSidebar;
