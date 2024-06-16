import React from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchCompetitions } from "~/lib/data";
import { Button } from "~/components/ui/button";
import CollapsibleCard from "~/components/card/CollapsibleCard";

export default async function CompetitionsCard({
  className,
}: {
  className?: string;
}) {
  const { competitions } = await fetchCompetitions();

  return (
    <CollapsibleCard title="Competitions" className={className}>
      <div className="relative">
        <div className="mx-auto grid w-full grid-cols-2 justify-items-center gap-2 md:grid-cols-1">
          {competitions?.map((competition) => (
            <Button
              key={competition.id}
              asChild
              variant="ghost"
              size="icon"
              className="mx-auto flex h-auto w-full flex-col items-center justify-start gap-3 border px-3 py-2 text-center md:flex-row"
            >
              <Link href={`/dashboard/competitions/${competition.code}`}>
                {competition.emblem && (
                  <Image
                    src={competition.emblem}
                    alt={competition.name}
                    width={30}
                    height={30}
                  />
                )}
                <span className="w-auto overflow-hidden text-ellipsis text-wrap text-left">
                  {competition.name ? competition.name : "Not found"}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </CollapsibleCard>
  );
}
