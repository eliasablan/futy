import React from "react";
import PlayerCard from "~/components/card/PlayerCard";
import { getPlayer } from "~/lib/data";

export default async function PlayerPage({
  params,
}: {
  params: { id: number };
}) {
  const player = await getPlayer(params.id);
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <PlayerCard className="col-span-3" player={player} />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2"></div>
    </>
  );
}
