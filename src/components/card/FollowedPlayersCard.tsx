import React from "react";
import { api } from "~/trpc/server";
import CollapsibleCard from "./CollapsibleCard";
import { type Session } from "next-auth";
import Link from "next/link";

export default async function FollowedPlayersCard({
  session,
}: {
  session: Session;
}) {
  const players = await api.playerFollow.findByUser({
    userId: session.user.id,
  });
  return (
    <CollapsibleCard title="Followed Players">
      <div className="flex flex-col items-center gap-2 text-center">
        {players?.map((player) => (
          <p key={player.id}>
            <Link href={`/dashboard/players/${player.playerId}`}>
              {player.playerName}
            </Link>
          </p>
        ))}
      </div>
    </CollapsibleCard>
  );
}
