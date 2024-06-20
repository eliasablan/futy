import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import type { URLSearchParams } from "url";

import { fetchTeams } from "~/lib/data";

import { api } from "~/trpc/server";
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
import CollapsibleCard from "~/components/card/CollapsibleCard";
import FollowTeamButton from "~/components/FollowTeamButton";

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
      <div className="relative">
        <div className="mx-auto grid w-full grid-cols-3 gap-3">
          {teams?.map(async (team) => {
            const follow =
              session &&
              (await api.teamFollow.previouslyFollowed({
                teamId: team.id,
                userId: session.user.id,
              }));
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
                {session && (
                  <FollowTeamButton
                    followId={follow?.id}
                    following={follow?.active}
                    team={team.id}
                    teamName={team.name}
                    user={session.user.id}
                    className="rounded-t-none"
                  />
                )}
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
                  href={`/dashboard/teams?page=${Number(page) - 1}`}
                />
              </PaginationItem>
            )}

            {page > 2 && (
              <PaginationItem>
                <PaginationLink
                  href={`/dashboard/teams?page=${Number(page) - 2}`}
                >
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>
            )}

            {page > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`/dashboard/teams?page=${Number(page) - 1}`}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                className="cursor-default"
                href={`/dashboard/teams?page=${Number(page)}`}
                isActive
              >
                {page}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages && (
              <PaginationItem>
                <PaginationLink
                  href={`/dashboard/teams?page=${Number(page) + 1}`}
                >
                  {Number(page) + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`/dashboard/teams?page=${Number(page) + 2}`}
                >
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>
            )}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href={`/dashboard/teams?page=${Number(page) + 1}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </CollapsibleCard>
  );
}
