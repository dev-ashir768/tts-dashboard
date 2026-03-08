"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import Unauthorized from "@/components/shared/unauthorized";
import { useAuthStore } from "@/store/auth.store";
import { menusData } from "@/lib/data";
import { ROLE } from "@/lib/constants";

interface ViewGuardProps {
  children: React.ReactNode;
}

const ViewGuard: React.FC<ViewGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const userRole = user?.role;

  const isAuthorized = useMemo(() => {
    if (!userRole) return false;

    if (userRole === ROLE.SUPER_ADMIN) return true;

    const allRoutes = menusData.flatMap((menu) => {
      const routes = [{ url: menu.url, permission: menu.permission }];
      if (menu.children) {
        menu.children.forEach((child) => {
          routes.push({
            url: child.url,
            permission: child.permission as string[],
          });
        });
      }
      return routes;
    });

    const sortedRoutes = [...allRoutes].sort(
      (a, b) => b.url.length - a.url.length,
    );
    const matchingRoute = sortedRoutes.find(
      (route) => pathname === route.url || pathname.startsWith(`${route.url}/`),
    );

    if (matchingRoute) {
      return (matchingRoute.permission as string[]).includes(userRole);
    }
    return true;
  }, [pathname, userRole]);

  if (!isAuthorized) {
    return <Unauthorized />;
  }

  return <>{children}</>;
};

export default ViewGuard;
