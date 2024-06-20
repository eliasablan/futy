import React from "react";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import type { Team } from "~/lib/types/team";
import CollapsibleCard from "~/components/card/CollapsibleCard";

import FollowTeamButton from "~/components/FollowTeamButton";

export default async function TeamCard({ team }: { team: Team }) {
  const session = await getServerAuthSession();
  const follow =
    team.id &&
    session &&
    (await api.teamFollow.previouslyFollowed({
      teamId: team.id,
      userId: session.user.id,
    }));

  console.log({ follow });
  return (
    <CollapsibleCard title="Team">
      {!team.ok ? (
        <div className="flex flex-col items-center text-center">
          <p className="text-destructive">{team.message}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <Image src={team.crest} alt={team.name} width={200} height={200} />
          <p className="mt-4 inline-flex gap-3 font-semibold">
            {team.area?.flag && (
              <Image
                src={team.area.flag}
                alt={team.area.name}
                width={20}
                height={20}
              />
            )}
            {team.name}
          </p>
          {team.coach?.name && (
            <p className="pt-2">
              <b>Coach: </b>
              {team.coach.name}
            </p>
          )}
          {team.venue && (
            <p className="pt-2">
              <b>Stadium: </b>
              {team.venue}
            </p>
          )}
          <p className="pt-2">
            <b>Foundation: </b>
            {team.founded}
          </p>
          {session && (
            <FollowTeamButton
              followId={follow ? follow.id : undefined}
              following={follow ? follow.active : undefined}
              team={team.id}
              user={session.user.id}
              teamName={team.name}
              className="my-4"
            />
          )}
        </div>
      )}
    </CollapsibleCard>
  );
}
