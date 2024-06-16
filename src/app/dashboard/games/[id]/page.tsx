import React from "react";
import MatchSummaryCard from "~/components/card/MatchSummaryCard";
import { fetchMatch } from "~/lib/data";
import type { Match } from "~/lib/types/match";

export default async function GamePage({ params }: { params: { id: number } }) {
  const match = (await fetchMatch(params.id)) as unknown as Match;
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <MatchSummaryCard match={match} />
        {/* <MatchesCard code={params.code} />
        <StandingsCard code={params.code} /> */}
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        {/* <LeagueCard league={league} /> */}
      </div>
    </>
  );
}
