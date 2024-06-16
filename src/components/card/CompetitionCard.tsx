import React from "react";

import Image from "next/image";
import type { FetchCompetition } from "~/lib/types/competition";
import CollapsibleCard from "./CollapsibleCard";

export default async function LeagueCard({
  league,
}: {
  league: FetchCompetition;
}) {
  return (
    <CollapsibleCard title="League">
      <div className="flex flex-col items-center">
        <Image src={league.emblem} alt={league.name} width={200} height={200} />
        <p className="inline-flex gap-3 pt-4 font-semibold">
          {league.area?.flag && (
            <Image
              src={league.area.flag}
              alt={league.area.name}
              width={20}
              height={20}
            />
          )}
          {league.name}
        </p>
      </div>
    </CollapsibleCard>
  );
}
