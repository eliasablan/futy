import React from "react";
import Image from "next/image";
import Link from "next/link";

import CollapsibleCard from "~/components/card/CollapsibleCard";

import type { Match } from "~/lib/types/match";
import { formatearFecha } from "~/lib/utils";

export default async function MatchSummaryCard({ match }: { match?: Match }) {
  if (!match) return null;
  return (
    <CollapsibleCard title="Match Summary">
      <div className="flex flex-col items-center">
        <Link
          href={`/dashboard/competitions/${match.competition.code}`}
          className="m-2 flex items-center justify-between gap-4 text-right"
        >
          <h3 className="text-xl font-semibold">{match.competition.name}</h3>
          <Image
            src={match.competition.emblem}
            height={50}
            width={50}
            alt={match.competition.name}
          />
        </Link>
        {match.status === "FINISHED" ? (
          <div className="my-2">
            <h3 className="my-1 text-center font-mono text-5xl font-semibold">
              FT
            </h3>
            <h3 className="my-1 text-center text-lg font-bold text-secondary-foreground">
              {formatearFecha({
                fechaISO: match.utcDate,
                format: "dd/MM/yy",
              })}
            </h3>
          </div>
        ) : match.status === "PAUSED" ? (
          <h3 className="my-2 text-center">HT</h3>
        ) : match.status === "TIMED" ? (
          <div className="my-2">
            <h3 className="my-1 text-center text-lg font-bold text-secondary-foreground">
              {formatearFecha({
                fechaISO: match.utcDate,
                format: "dd/MM/yy",
              })}
            </h3>
            <h3 className="my-1 text-center font-mono text-5xl font-semibold">
              {formatearFecha({
                fechaISO: match.utcDate,
                format: "HH:mm",
              })}
            </h3>
          </div>
        ) : match.status === "IN_PLAY" ? (
          <>
            {/* <h3 className="my-2 text-center">
            {formatearFecha({
              fechaISO: match.utcDate,
              format: "dd/MM/yy",
            })}
          </h3> */}
          </>
        ) : match.status === "POSTPONED" ? (
          <>
            <h3 className="my-1 text-center text-lg font-bold text-secondary-foreground">
              {formatearFecha({
                fechaISO: match.utcDate,
                format: "dd/MM/yy",
              })}
            </h3>
            <h3 className="my-1 text-center font-mono text-5xl font-semibold">
              {formatearFecha({
                fechaISO: match.utcDate,
                format: "HH:mm",
              })}
            </h3>
          </>
        ) : null}
        <div className="flex flex-col items-center gap-2">
          <p className="font-bold text-primary">
            Matchday #{match.season.currentMatchday}
          </p>
        </div>
        <div className="m-8 flex w-full justify-around px-0 text-lg">
          <div className="flex h-64 flex-col items-center justify-between">
            <p className="text-center font-mono text-2xl font-semibold text-primary">
              {match.homeTeam.shortName || match.homeTeam.name}
            </p>
            <Link href={`/dashboard/teams/${match.homeTeam.id}`}>
              <Image
                src={match.homeTeam.crest}
                height={100}
                width={100}
                alt={match.homeTeam.name}
              />
            </Link>
            <p className="text-warning text-center font-mono text-7xl font-semibold">
              {match.score.fullTime.home}
            </p>
          </div>
          <div className="flex h-64 flex-col items-center justify-between">
            <p className="text-center font-mono text-2xl font-semibold text-primary">
              {match.awayTeam.shortName || match.awayTeam.name}
            </p>
            <Link href={`/dashboard/teams/${match.awayTeam.id}`}>
              <Image
                src={match.awayTeam.crest}
                height={100}
                width={100}
                alt={match.awayTeam.name}
              />
            </Link>
            <p className="text-warning text-center font-mono text-7xl font-semibold">
              {match.score.fullTime.away}
            </p>
          </div>
        </div>
      </div>
    </CollapsibleCard>
  );
}
