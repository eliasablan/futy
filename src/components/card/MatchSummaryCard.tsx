import React from "react";
import Image from "next/image";
import Link from "next/link";

import CollapsibleCard from "~/components/card/CollapsibleCard";

import type { Match } from "~/lib/types/match";

export default async function MatchSummaryCard({ match }: { match?: Match }) {
  if (!match) return null;
  return (
    <CollapsibleCard
      title={
        (match.homeTeam.shortName || match.homeTeam.name) +
        " vs. " +
        (match.awayTeam.shortName || match.awayTeam.name)
      }
    >
      <div className="flex flex-col items-center">
        <Link href={`/dashboard/competitions/${match.competition.code}`}>
          <h3 className="text-xl font-bold">{match.competition.name}</h3>
        </Link>
        <div className="flex w-full justify-around px-0 text-lg">
          <div className="flex flex-col items-center justify-between gap-2">
            <Link href={`/dashboard/teams/${match.homeTeam.id}`}>
              <Image
                src={match.homeTeam.crest}
                height={100}
                width={100}
                alt={match.homeTeam.name}
                className="max-h-24"
              />
              <p className="mt-4 max-w-24 text-center text-sm">
                {match.homeTeam.shortName || match.homeTeam.name}
              </p>
            </Link>
            <p className="text-center text-7xl">{match.score.fullTime.home}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Link href={`/dashboard/teams/${match.awayTeam.id}`}>
              <Image
                src={match.awayTeam.crest}
                height={100}
                width={100}
                alt={match.awayTeam.name}
                className="max-h-24"
              />
              <p className="mt-4 max-w-24 text-center text-sm">
                {match.awayTeam.shortName || match.awayTeam.name}
              </p>
            </Link>
            <p className="text-center text-7xl">{match.score.fullTime.away}</p>
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-center text-xl font-bold">
        {match.status === "FINISHED" && "FT"}
        {match.status === "PAUSED" && "HT"}
      </h3>
    </CollapsibleCard>
  );
}
