import UserProfile from "@/features/users/user-profile";
import { SidebarTrigger } from "../../ui/sidebar";

const AppHeader = () => {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4 sticky z-50 top-0 bg-white">
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
          </div>

          <UserProfile />
        </div>
      </header>
    </>
  );
};

export default AppHeader;
