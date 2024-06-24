import React from "react";
import TeamsCard from "~/components/card/TeamsCard";
import type { URLSearchParams } from "url";
import FollowedTeamsCard from "~/components/card/FollowedTeamsCard";
import { getServerAuthSession } from "~/server/auth";

export default async function Teams({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const session = await getServerAuthSession();
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <TeamsCard searchParams={searchParams} />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        {session && <FollowedTeamsCard session={session} />}
      </div>
    </>
  );
}
