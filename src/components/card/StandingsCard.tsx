import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import CollapsibleCard from "~/components/card/CollapsibleCard";
import { fetchStandings } from "~/lib/data";

export default async function StandingsCard({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const { competition, standings } = await fetchStandings(code);

  return (
    <CollapsibleCard title="Standings" className={className}>
      {competition?.type === "LEAGUE" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead>Pts</TableHead>
              <TableHead>G</TableHead>
              <TableHead>W</TableHead>
              <TableHead>D</TableHead>
              <TableHead>L</TableHead>
              <TableHead>{"+/-"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings[0]?.table.map((teamStanding) => (
              <TableRow key={teamStanding.position}>
                <TableCell>
                  <Link href={`/dashboard/teams/${teamStanding.team.id}`}>
                    <div className="flex h-fit items-center justify-start pr-4">
                      {teamStanding.team.crest && (
                        <Image
                          src={teamStanding.team.crest}
                          className="mr-2"
                          width={22}
                          height={22}
                          alt={teamStanding.team.shortName}
                        />
                      )}
                      {teamStanding.team.shortName}
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{teamStanding.points}</TableCell>
                <TableCell>{teamStanding.playedGames}</TableCell>
                <TableCell>{teamStanding.won}</TableCell>
                <TableCell>{teamStanding.draw}</TableCell>
                <TableCell>{teamStanding.lost}</TableCell>
                <TableCell>{teamStanding.goalDifference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {competition?.type === "CUP" &&
        standings.map((standing) => (
          <div key={standing.group} className="py-4">
            <div className="border-b pb-2 sm:flex sm:items-center sm:justify-between">
              <h2 key={standing.group} className="text-base font-normal">
                {standing.group}
              </h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>Pts</TableHead>
                  <TableHead>G</TableHead>
                  <TableHead>W</TableHead>
                  <TableHead>D</TableHead>
                  <TableHead>L</TableHead>
                  <TableHead>{"+/-"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standing.table.map((teamStanding) => (
                  <TableRow key={teamStanding.position}>
                    <TableCell>
                      <Link href={`/dashboard/teams/${teamStanding.team.id}`}>
                        <div className="flex h-fit items-center justify-start pr-4">
                          {teamStanding.team.crest && (
                            <Image
                              src={teamStanding.team.crest}
                              className="mr-2"
                              width={22}
                              height={22}
                              alt="Team Crest"
                            />
                          )}
                          {teamStanding.team.shortName}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>{teamStanding.points}</TableCell>
                    <TableCell>{teamStanding.playedGames}</TableCell>
                    <TableCell>{teamStanding.won}</TableCell>
                    <TableCell>{teamStanding.draw}</TableCell>
                    <TableCell>{teamStanding.lost}</TableCell>
                    <TableCell>{teamStanding.goalDifference}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
    </CollapsibleCard>
  );
}
