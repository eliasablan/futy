import React from "react";
import TeamsCard from "~/components/card/TeamsCard";
import type { URLSearchParams } from "url";

const Teams = ({ searchParams }: { searchParams: URLSearchParams }) => {
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <TeamsCard searchParams={searchParams} />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        {/* <CompetitionsCard /> */}
      </div>
    </>
  );
};
export default Teams;
