import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import type { FetchPlayer } from "~/lib/types/player";
import CollapsibleCard from "~/components/card/CollapsibleCard";

import FollowPlayerButton from "~/components/FollowPlayerButton";

export default async function PlayerCard({
  player,
  className,
}: {
  player: FetchPlayer;
  className?: string;
}) {
  const session = await getServerAuthSession();
  const follow =
    session &&
    (await api.playerFollow.previouslyFollowed({
      playerId: player.id,
      userId: session.user.id,
    }));

  return (
    <CollapsibleCard title="Player Information" className={className}>
      <div className="flex flex-col items-center text-center">
        <h2 className="mt-4 inline-flex gap-3 font-mono text-2xl font-semibold">
          {player.name}
        </h2>
        <p className="pt-2 text-primary">
          <span className="font-semibold">Position: </span>
          {player.position}
        </p>
        <p className="pt-2">
          <span className="font-semibold">Nacionalidad: </span>
          {player.nationality}
        </p>
        <p className="pt-2">
          <span className="font-semibold">Fecha de nacimiento: </span>
          {player.dateOfBirth.substring(2).split("-").reverse().join("/")}
        </p>
        {session && (
          <FollowPlayerButton
            followId={follow ? follow[0]?.id : undefined}
            following={follow ? follow[0]?.active : undefined}
            player={player.id}
            playerName={player.name}
            user={session.user.id}
            className="my-4"
          />
        )}
      </div>
    </CollapsibleCard>
  );
}
