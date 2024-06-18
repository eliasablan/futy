import React from "react";
import { fetchCompetition } from "~/lib/data";
import StandingsCard from "~/components/card/StandingsCard";
import MatchesCard from "~/components/card/MatchesCard";
import CompetitionCard from "~/components/card/CompetitionCard";

export default async function LeaguePage({
  params,
}: {
  params: { code: string };
}) {
  const competition = await fetchCompetition(params.code);
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <MatchesCard code={params.code} />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        <CompetitionCard league={competition} />
        <StandingsCard code={params.code} />
      </div>
    </>
  );
}
