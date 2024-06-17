import React from "react";

import CollapsibleCard from "~/components/card/CollapsibleCard";
import type { FetchPlayer } from "~/lib/types/player";

export default async function PlayerCard({
  player,
  className,
}: {
  player: FetchPlayer;
  className?: string;
}) {
  console.log({ player });
  return (
    <CollapsibleCard title="Player Information" className={className}>
      <div className="flex flex-col items-center">
        <p className="mt-4 inline-flex gap-3 font-semibold">{player.name}</p>
        <p className="pt-2">{player.position}</p>
        <p className="pt-2">
          {player.dateOfBirth.substring(2).split("-").reverse().join("/")}
        </p>
        <p className="pt-2">{player.nationality}</p>
        <p className="pt-2">{player.dateOfBirth}</p>
      </div>
    </CollapsibleCard>
  );
}
