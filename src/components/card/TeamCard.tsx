import React from "react";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import CollapsibleCard from "~/components/card/CollapsibleCard";

import type { Team } from "~/lib/types/team";
import FollowButton from "~/components/FollowButton";

export default async function TeamCard({ team }: { team: Team }) {
  const session = await getServerAuthSession();
  const following = session?.user.id
    ? await api.teamFollower.isFollowed({
        teamId: team.id,
        userId: session.user.id,
      })
    : null;
  return (
    <CollapsibleCard title="Team">
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
        <p className="pt-2">
          {team.coach?.name && (
            <p>
              <b>Coach: </b>
              {team.coach.name}
            </p>
          )}
        </p>
        <p className="pt-2">
          {team.venue && (
            <p>
              <b>Stadium: </b>
              {team.venue}
            </p>
          )}
        </p>
        <p className="pt-2">
          <b>Foundation: </b>
          {team.founded}
        </p>
        {following && (
          <FollowButton
            className="my-4"
            team={team.id}
            teamName={team.name}
            user={session?.user.id ?? ""}
            following={following}
          />
        )}
      </div>
    </CollapsibleCard>
  );
}
