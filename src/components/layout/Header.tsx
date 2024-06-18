import React from "react";
import MobileSidebar from "~/components/layout/MobileSidebar";
import ProfileNavigation from "~/components/layout/ProfileNavigation";
import { BreadcrumbResponsive } from "~/components/layout/Breadcrumbs";
import { CommandBar } from "~/components/layout/Command";

export default function Header() {
  return (
    <header className="top-0 z-30 flex h-14 items-center gap-4 border-b bg-muted sm:static sm:h-auto sm:border-0 md:sticky">
      {/* Page Header */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2">
        {/* Mobile Sidebar and Breadcrumbs */}
        <div className="flex items-center gap-4">
          <MobileSidebar />
          <BreadcrumbResponsive />
        </div>
        {/* Command Search Modal and Profile Settings */}
        <div className="flex items-center gap-4">
          <CommandBar />
          <ProfileNavigation />
        </div>
      </div>
    </header>
  );
}
