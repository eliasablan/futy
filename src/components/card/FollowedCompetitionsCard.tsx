import React from "react";
import { api } from "~/trpc/server";
import CollapsibleCard from "./CollapsibleCard";
import { type Session } from "next-auth";
import Link from "next/link";

export default async function FollowedCompetitionsCard({
  session,
}: {
  session: Session;
}) {
  const competitions = await api.competitionFollow.findByUser({
    userId: session.user.id,
  });
  return (
    <CollapsibleCard title="Followed Competitions">
      <div className="flex flex-col items-center gap-2 text-center">
        {competitions?.map((competition) => (
          <p key={competition.id}>
            <Link
              href={`/dashboard/competitions/${competition.competitionCode}`}
            >
              {competition.competitionName}
            </Link>
          </p>
        ))}
      </div>
    </CollapsibleCard>
  );
}
