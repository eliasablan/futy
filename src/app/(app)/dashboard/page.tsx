import React from "react";
import { getServerAuthSession } from "~/server/auth";
import MatchesCard from "~/components/card/MatchesCard";
import FollowedTeamsCard from "~/components/card/FollowedTeamsCard";
import FollowedPlayersCard from "~/components/card/FollowedPlayersCard";
import FollowedCompetitionsCard from "~/components/card/FollowedCompetitionsCard";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <MatchesCard />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        {session && (
          <>
            <FollowedPlayersCard session={session} />
            <FollowedTeamsCard session={session} />
            <FollowedCompetitionsCard session={session} />
          </>
        )}
        {/* <CompetitionsCard /> */}
      </div>
    </>
  );
}
