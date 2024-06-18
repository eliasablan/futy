import MatchesCard from "~/components/card/MatchesCard";
import CompetitionsCard from "~/components/card/CompetitionsCard";

export default function Dashboard() {
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <MatchesCard />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        <CompetitionsCard />
      </div>
    </>
  );
}
