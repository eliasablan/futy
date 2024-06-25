import React from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function SidebarTooltip({
  message,
  href,
  children,
}: {
  message: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={50}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/dashboard${href}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            {children}

            <span className="sr-only">{message}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{message}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
