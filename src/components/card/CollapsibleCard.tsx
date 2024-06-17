import React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { cn } from "~/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function CollapsibleCard({
  className,
  children,
  title,
}: {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}) {
  return (
    <Card className={cn("bg-muted/50", className)}>
      <Collapsible defaultOpen>
        <CardHeader className="p-3 py-2">
          <CollapsibleTrigger className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CaretSortIcon className="h-4 w-4" />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="p-3">{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
