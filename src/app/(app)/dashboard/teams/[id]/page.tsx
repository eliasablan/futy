import React from "react";
import TeamCard from "~/components/card/TeamCard";
import MatchesCard from "~/components/card/MatchesCard";
import PlayersCard from "~/components/card/PlayersCard";

import { fetchTeam } from "~/lib/data";

const TeamPage = async ({ params }: { params: { id: number } }) => {
  const team = await fetchTeam(params.id);

  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <MatchesCard team={team.id} />
        <PlayersCard players={team.squad} />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        <TeamCard team={team} />
      </div>
    </>
  );
};

export default TeamPage;
