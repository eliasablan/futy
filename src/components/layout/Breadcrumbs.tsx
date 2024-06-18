"use client";

import * as React from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import path from "path";
// import { set } from "date-fns";

const ITEMS_TO_DISPLAY = 2;

export function BreadcrumbResponsive() {
  const [items, setItems] = useState<{ href: string; label: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const breadrumbItems: { href: string; label: string }[] = [];
    let href = "";
    pathname.split("/").map((path, index) => {
      if (!path) return;
      href = `${href}/${path}`;
      breadrumbItems.push({
        href: pathname.split("/").length - 1 === index ? "" : href,
        label: path,
      });
    });

    setItems(breadrumbItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
  }, []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.length > 1 && (
          <>
            <BreadcrumbItem className="capitalize">
              <BreadcrumbLink href={items[0]?.href}>
                {items[0]?.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        {items.length > ITEMS_TO_DISPLAY && (
          <>
            {isDesktop ? (
              items.slice(1, -1).map((item, index) => (
                <>
                  <BreadcrumbItem key={index} className="capitalize">
                    <BreadcrumbLink href={item.href ? item.href : "#"}>
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ))
            ) : (
              <>
                <BreadcrumbItem>
                  <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger
                      className="flex items-center gap-1"
                      aria-label="Toggle menu"
                    >
                      <BreadcrumbEllipsis className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {items.slice(1, -1).map((item, index) => (
                        <DropdownMenuItem key={index} className="capitalize">
                          <Link href={item.href ? item.href : "#"}>
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
          </>
        )}

        {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => {
          return (
            <BreadcrumbItem key={index} className="capitalize">
              <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                {item.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
