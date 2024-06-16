import React from "react";
import { Search } from "lucide-react";

import MobileSidebar from "~/components/layout/MobileSidebar";
import ProfileNavigation from "~/components/layout/ProfileNavigation";
import { BreadcrumbResponsive } from "~/components/layout/Breadcrumbs";
import { Input } from "~/components/ui/input";

export default function Header() {
  return (
    <header className="top-0 z-30 flex h-14 items-center gap-4 border-b bg-muted sm:static sm:h-auto sm:border-0 md:sticky">
      {/* Page Header */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-end gap-4 px-4 py-2">
        {/* Mobile Sidebar */}
        <MobileSidebar />
        {/* Breadcrumbs */}
        <BreadcrumbResponsive />
        {/* Search and Profile Settings */}
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <ProfileNavigation />
      </div>
    </header>
  );
}
