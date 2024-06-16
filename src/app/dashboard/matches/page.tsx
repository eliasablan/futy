import React from "react";
import MatchesCard from "~/components/card/MatchesCard";

const Matches = async () => {
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <MatchesCard />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        {/* <CompetitionsCard /> */}
      </div>
    </>
  );
};

export default Matches;
