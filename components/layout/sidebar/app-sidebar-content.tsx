"use client";

import React, { useEffect, useMemo, useState } from "react";
import * as Icons from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menusData } from "@/lib/data";
import { useAuthStore } from "@/store/auth.store";
import { ROLE } from "@/lib/constants";

const AppSidebarContent = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const userRole = user?.role;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  const filteredMenus = useMemo(() => {
    if (!userRole) return [];

    return menusData
      .filter((menu) => {
        if (userRole === ROLE.SUPER_ADMIN) return true;
        return (menu.permission as string[]).includes(userRole);
      })
      .map((menu) => ({
        ...menu,
        children: menu.children?.filter((child) => {
          if (userRole === ROLE.SUPER_ADMIN) return true;
          return (child.permission as string[]).includes(userRole);
        }),
      }));
  }, [userRole]);

  useEffect(() => {
    const activeParent = menusData.find((item) =>
      item.children?.some((child) => child.url === pathname),
    );
    if (activeParent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenPanel(activeParent.url);
    }
  }, [pathname]);

  if (!isHydrated || filteredMenus.length === 0) {
    return (
      <SidebarGroup>
        <SidebarMenu>
          {[...Array(10)].map((_, i) => {
            return (
              <SidebarMenuItem key={`skeleton-${i}`}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {filteredMenus.map((item) => {
            const Icon = item.icon
              ? (Icons[item.icon as keyof typeof Icons] as React.ElementType)
              : null;
            const hasChildren =
              item.children?.length && item.children.length > 0;

            const isParentOfActiveChild = item.children?.some(
              (child) => child.url === pathname,
            );
            const activeMenu = item.url === pathname || isParentOfActiveChild;

            const panelIsOpen = openPanel === item.url;

            return hasChildren ? (
              <Collapsible
                key={item.menu_id}
                className="group/collapsible"
                open={panelIsOpen}
                onOpenChange={(open) => {
                  setOpenPanel(open ? item.url : null);
                }}
                asChild
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.menu_name}
                      className="cursor-pointer transition-all duration-300 ease-in-out"
                      isActive={activeMenu}
                    >
                      {Icon && <Icon />}
                      <span>{item.menu_name}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub>
                      {item.children?.map((child) => (
                        <SidebarMenuSubItem key={child.menu_name}>
                          <SidebarMenuSubButton
                            className="transition-colors duration-200"
                            asChild
                            isActive={child.url === pathname}
                          >
                            <Link href={child.url}>
                              <span>{child.menu_name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.menu_id}>
                <SidebarMenuButton
                  asChild
                  isActive={activeMenu}
                  onClick={() => setOpenPanel(null)}
                  className="transition-colors duration-200"
                >
                  <Link href={item.url}>
                    {Icon && <Icon />}
                    <span>{item.menu_name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default AppSidebarContent;
