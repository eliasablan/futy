import React from "react";
import { Home, Calendar, Users2Icon, Trophy } from "lucide-react";
import { ModeToggle } from "~/components/ModeToggle";
import SidebarTooltip from "./SidebarTooltip";
import CreateBid from "./CreateBid";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <CreateBid />
        {/* <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link> */}
        <SidebarTooltip message="Dashboard" href="/">
          <Home className="h-5 w-5" />
        </SidebarTooltip>
        <SidebarTooltip message="Matches" href="/matches">
          <Calendar className="h-5 w-5" />
        </SidebarTooltip>
        <SidebarTooltip message="Competitions" href="/competitions">
          <Trophy className="h-5 w-5" />
        </SidebarTooltip>
        <SidebarTooltip message="Teams" href="/teams">
          <Users2Icon className="h-5 w-5" />
        </SidebarTooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ModeToggle />
      </nav>
    </aside>
  );
}
