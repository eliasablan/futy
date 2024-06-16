import React from "react";
import Image from "next/image";

import CollapsibleCard from "~/components/card/CollapsibleCard";

import type { Team } from "~/lib/types/team";

export default async function TeamCard({ team }: { team: Team }) {
  return (
    <CollapsibleCard title="Team">
      <div className="flex flex-col items-center text-center">
        <Image src={team.crest} alt={team.name} width={200} height={200} />
        <p className="mt-4 inline-flex gap-3 font-semibold">
          {team.area?.flag && (
            <Image
              src={team.area.flag}
              alt={team.area.name}
              width={20}
              height={20}
            />
          )}
          {team.name}
        </p>
        <p className="pt-2">
          {team.coach?.name && (
            <p>
              <b>Coach: </b>
              {team.coach.name}
            </p>
          )}
        </p>
        <p className="pt-2">
          {team.venue && (
            <p>
              <b>Stadium: </b>
              {team.venue}
            </p>
          )}
        </p>
        <p className="pt-2">
          <b>Foundation: </b>
          {team.founded}
        </p>
        {/* <FollowButton
          type="teams"
          id={team.id.toString()}
          name={team.name}
          emblem={team.crest}
        /> */}
      </div>
    </CollapsibleCard>
  );
}
