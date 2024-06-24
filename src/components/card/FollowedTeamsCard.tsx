import React from "react";
import { api } from "~/trpc/server";
import CollapsibleCard from "./CollapsibleCard";
import { type Session } from "next-auth";
import Link from "next/link";

export default async function FollowedTeamsCard({
  session,
}: {
  session: Session;
}) {
  const teams = await api.teamFollow.findByUser({ userId: session.user.id });
  return (
    <CollapsibleCard title="Followed Teams">
      <div className="flex flex-col items-center gap-2 text-center">
        {teams?.map((team) => (
          <p key={team.id}>
            <Link href={`/dashboard/teams/${team.teamId}`}>
              {team.teamName}
            </Link>
          </p>
        ))}
      </div>
    </CollapsibleCard>
  );
}
