import React from "react";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import type { FetchCompetition } from "~/lib/types/competition";
import CollapsibleCard from "./CollapsibleCard";

import FollowCompetitionButton from "~/components/FollowCompetitionButton";

export default async function CompetitionCard({
  competition,
}: {
  competition: FetchCompetition;
}) {
  const session = await getServerAuthSession();
  const follow =
    session &&
    (await api.competitionFollow.previouslyFollowed({
      competitionCode: competition.code,
      userId: session.user.id,
    }));

  return (
    <CollapsibleCard title="Competition">
      <div className="flex flex-col items-center">
        <Image
          src={competition.emblem}
          alt={competition.name}
          width={200}
          height={200}
        />
        <p className="inline-flex gap-3 pt-4 font-semibold">
          {competition.area?.flag && (
            <Image
              src={competition.area.flag}
              alt={competition.area.name}
              width={20}
              height={20}
            />
          )}
          {competition.name}
        </p>
        {session && (
          <FollowCompetitionButton
            followingId={follow ? follow[0]?.id : undefined}
            following={follow ? follow[0]?.active : undefined}
            competition={competition.code}
            user={session.user.id}
            competitionName={competition.name}
            className="my-4"
          />
        )}
      </div>
    </CollapsibleCard>
  );
}
