import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Blocks } from "lucide-react";

const AppSidebarHeader = () => {
  return (
    <>
      {/* <SidebarMenu className="h-full">
        <SidebarMenuItem className="h-full">
          <SidebarMenuButton
            size="lg"
            className="hover:bg-transparent active:bg-transparent h-full"
            asChild
          >
            <Link href={PROTECTED_ROUTES.DASHBOARD.HOME}>
              <div className="hidden aspect-square size-8 rounded-md overflow-hidden transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:flex">
                <Image
                  src="/images/branding/favicon.ico"
                  width={32}
                  height={32}
                  className="w-full h-full"
                  alt="logo"
                />
              </div>
              <div className="flex aspect-square mx-auto w-28 h-12 transition-[width,height,margin] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:hidden">
                <Image
                  src="/images/branding/logo.svg"
                  width={112}
                  height={48}
                  className="w-full h-full"
                  alt="logo"
                />
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu> */}

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Blocks className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">TTS Dashboard</span>
              <span className="truncate text-xs">Admin</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
};

export default AppSidebarHeader;
