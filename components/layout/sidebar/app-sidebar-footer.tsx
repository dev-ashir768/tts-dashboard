"use client";

import Link from "next/link";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

const AppSidebarFooter = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <footer className="text-center font-normal text-sm flex justify-center items-center">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <Link
              href="https://getorio.com"
              target="_blank"
              className="hover:underline underline-offset-2 cursor-pointer!"
            >
              Ashir
            </Link>
            . All rights reserved.
          </p>
        </footer>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AppSidebarFooter;
