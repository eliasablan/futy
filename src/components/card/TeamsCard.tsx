import React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

import { fetchTeams } from "~/lib/data";

import { URLSearchParams } from "url";
import CollapsibleCard from "~/components/card/CollapsibleCard";
import FollowButton from "../FollowButton";
import { isFollowing } from "~/lib/actions";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { teamFollowers } from "~/server/db/schema";

export default async function TeamsCard({
  searchParams,
  className,
}: {
  searchParams: URLSearchParams & { page?: string };
  className?: string;
}) {
  const session = await getServerAuthSession();
  const totalPages = 636;
  const page = (searchParams.page ?? 1) as number;
  const { teams } = await fetchTeams({ page });

  return (
    <CollapsibleCard title="Teams" className={className}>
      {/* Table of teams */}
      <div className="relative">
        <div className="mx-auto grid w-full grid-cols-3 gap-3">
          {teams?.map(async (team) => {
            const following = await db.query.teamFollowers.findFirst({
              where:
                eq(teamFollowers.userId, session?.user?.id) &&
                eq(teamFollowers.teamId, team.id),
            });

            return (
              <div className="flex w-full flex-col" key={team.id}>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "flex h-32 w-full flex-col justify-center rounded-b-none border px-2",
                    !team.tla && "pointer-events-none opacity-35",
                  )}
                >
                  <Link
                    className="flex flex-col text-center"
                    href={`/dashboard/teams/${team.id}`}
                  >
                    {team.crest && (
                      <Image
                        src={team.crest}
                        alt={team.name}
                        width={40}
                        height={40}
                      />
                    )}
                    <span className="mt-5 w-full overflow-hidden text-ellipsis text-wrap">
                      {team.name ? team.name : "Not found"}
                    </span>
                  </Link>
                </Button>
                <FollowButton team={team.id} following={following} />
              </div>
            );
          })}
        </div>
      </div>
      {/* Pagination */}
      <div className="container mx-auto inline-block">
        <Pagination className="mt-6">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`?${new URLSearchParams({ page: `${Number(page) - 1}` })}`}
                />
              </PaginationItem>
            )}

            {page > 2 && (
              <PaginationItem>
                <PaginationLink
                  href={`?${new URLSearchParams({ page: `${Number(page) - 2}` })}`}
                >
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>
            )}

            {page > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`?${new URLSearchParams({ page: `${Number(page) - 1}` })}`}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                className="cursor-default"
                href={`?${new URLSearchParams({ page: String(page) })}`}
                isActive
              >
                {page}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages && (
              <PaginationItem>
                <PaginationLink
                  href={`?${new URLSearchParams({ page: `${Number(page) + 1}` })}`}
                >
                  {Number(page) + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`?${new URLSearchParams({ page: `${Number(page) + 2}` })}`}
                >
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>
            )}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href={`?${new URLSearchParams({ page: `${Number(page) + 1}` })}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </CollapsibleCard>
  );
}
