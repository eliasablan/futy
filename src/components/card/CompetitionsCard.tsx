import React from "react";
import Link from "next/link";
import Image from "next/image";

import { api } from "~/trpc/server";
import { fetchCompetitions } from "~/lib/data";
import { Button } from "~/components/ui/button";
import CollapsibleCard from "~/components/card/CollapsibleCard";
import { getServerAuthSession } from "~/server/auth";
import FollowCompetitionButton from "../FollowCompetitionButton";

export default async function CompetitionsCard({
  className,
}: {
  className?: string;
}) {
  const session = await getServerAuthSession();
  const { competitions } = await fetchCompetitions();

  return (
    <CollapsibleCard title="Competitions" className={className}>
      <div className="relative">
        <div className="mx-auto grid w-full grid-cols-2 justify-items-center gap-2 md:grid-cols-1">
          {competitions?.map(async (competition) => {
            const follow =
              session &&
              (await api.competitionFollow.previouslyFollowed({
                competitionCode: competition.code,
                userId: session.user.id,
              }));
            return (
              <div
                key={competition.id}
                className="flex w-full flex-col overflow-hidden rounded-md border md:flex-row"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="mx-auto flex h-full w-full flex-col items-center justify-center gap-3 rounded-none border-none px-3 py-2 text-center md:flex-row md:justify-start"
                  asChild
                >
                  <Link href={`/dashboard/competitions/${competition.code}`}>
                    {competition.emblem && (
                      <Image
                        src={competition.emblem}
                        alt={competition.name}
                        width={32}
                        height={32}
                        className="h-8"
                      />
                    )}
                    <span className="w-auto overflow-hidden text-ellipsis text-wrap md:text-left">
                      {competition.name ? competition.name : "Not found"}
                    </span>
                  </Link>
                </Button>
                {session && (
                  <FollowCompetitionButton
                    followId={follow?.id}
                    following={follow?.active}
                    competition={competition.code}
                    competitionName={competition.name}
                    user={session.user.id}
                    className="h-9 w-full rounded-none border-none md:h-full md:w-28"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </CollapsibleCard>
  );
}
