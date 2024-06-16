import React from "react";
import CompetitionsCard from "~/components/card/CompetitionsCard";

const Competitions = () => {
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <CompetitionsCard />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        {/* <CompetitionsCard /> */}
      </div>
    </>
  );
};

export default Competitions;
