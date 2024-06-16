import MatchesCard from "~/components/card/MatchesCard";
import CompetitionsCard from "~/components/card/CompetitionsCard";
import TeamsCard from "~/components/card/TeamsCard";
import type { URLSearchParams } from "url";

export default function Dashboard({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-3">
        <MatchesCard />
        <TeamsCard searchParams={searchParams} />
      </div>
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-2">
        <CompetitionsCard />
      </div>
    </>
  );
}
