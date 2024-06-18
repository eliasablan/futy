import React from "react";
import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  PanelLeft,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import CreateBid from "./CreateBid";
import { ModeToggle } from "../ModeToggle";

const items = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: () => <Home className="h-5 w-5" />,
  },
  {
    href: "/dashboard/matches",
    label: "Matches",
    icon: () => <LineChart className="h-5 w-5" />,
  },
  {
    href: "/dashboard/teams",
    label: "Teams",
    icon: () => <Users2 className="h-5 w-5" />,
  },
  {
    href: "/dashboard/competitions",
    label: "Competitions",
    icon: () => <Package className="h-5 w-5" />,
  },
];

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <div className="flex items-center gap-4">
            <ModeToggle />
            <CreateBid />
          </div>

          {items.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                {item.icon()}
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
