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
