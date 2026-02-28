"use client";

import React from "react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menusData } from "@/lib/data";

const AppSidebarContent = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {menusData.map((item) => {
            const Icon = item.icon
              ? (Icons[item.icon as keyof typeof Icons] as React.ElementType)
              : null;
            const hasChildren =
              item.children?.length && item.children.length > 0;
            const activeSubMenu =
              item.url === pathname || pathname.includes(item.url);
            const activeMenu = item.url === pathname;

            return hasChildren ? (
              <Collapsible
                key={item.menu_id}
                className="group/collapsible"
                asChild
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.menu_name}
                      className="cursor-pointer"
                      isActive={activeSubMenu}
                    >
                      {Icon && <Icon />}
                      <span>{item.menu_name}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children?.map((child) => (
                        <SidebarMenuSubItem key={child.menu_name}>
                          <SidebarMenuSubButton
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
                <SidebarMenuButton asChild isActive={activeMenu}>
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
