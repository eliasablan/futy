import React from "react";
import { getServerAuthSession } from "~/server/auth";
import CompetitionsCard from "~/components/card/CompetitionsCard";
import FollowedCompetitionsCard from "~/components/card/FollowedCompetitionsCard";

export default async function Competitions() {
  const session = await getServerAuthSession();
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <CompetitionsCard />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        {session && <FollowedCompetitionsCard session={session} />}
      </div>
    </>
  );
}
