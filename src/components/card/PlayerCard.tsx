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
  return (
    <CollapsibleCard title="Player Information" className={className}>
      <div className="flex flex-col items-center">
        <h2 className="mt-4 inline-flex gap-3 font-mono text-4xl font-semibold">
          {player.name}
        </h2>
        <p className="pt-2 text-2xl text-primary">
          <span className="font-semibold">Position: </span>
          {player.position}
        </p>
        <p className="pt-2 text-xl">
          <span className="font-semibold">Nacionalidad: </span>
          {player.nationality}
        </p>
        <p className="pt-2 text-lg">
          <span className="font-semibold">Fecha de nacimiento: </span>
          {player.dateOfBirth.substring(2).split("-").reverse().join("/")}
        </p>
      </div>
    </CollapsibleCard>
  );
}
