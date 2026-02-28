"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ChevronsUpDown, Key, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import ChangePassword from "./change-password";
import { useAuthStore } from "@/store/auth.store";

const UserProfile = () => {
  // ============ Hooks ============ \\
  const { user, logout } = useAuthStore();
  const { isMobile } = useSidebar();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
  };

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex items-center gap-2 px-0 w-[205px] h-12">
        <Skeleton className="h-[34px] w-[34px] rounded-md shrink-0" />
        <div className="flex flex-1 flex-col gap-1">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-3 w-32 rounded" />
        </div>
      </div>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="px-0! hover:bg-transparent focus-visible:ring-0 [&[data-state=open]>svg]:rotate-180 w-[205px]"
          >
            <Avatar className="h-[34px] w-[34px] rounded-md bg-gray-50">
              <AvatarImage
                src={"/images/avatars/user-avatar.png"}
                className="object-cover"
                alt={user?.full_name?.slice(0, 2)}
              />
              <AvatarFallback className="rounded-lg">
                {user?.full_name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium capitalize">
                {user?.full_name}
              </span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-[210px] rounded-md border-0 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]"
          side={isMobile ? "bottom" : "bottom"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/">
                <User />
                User Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsPasswordDialogOpen(true)}
            >
              <Key />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/login" onClick={handleLogout}>
                <LogOut />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangePassword
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      />
    </>
  );
};

export default UserProfile;
