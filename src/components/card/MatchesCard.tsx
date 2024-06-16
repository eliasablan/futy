"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { LoaderCircle, RotateCw } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";

import {
  cn,
  formatearFecha,
  obtenerPrimerDiaSemana,
  obtenerUltimoDiaSemana,
} from "~/lib/utils";
import { fetchMatches } from "~/lib/actions";
import type { Match } from "~/lib/types/match";
import CollapsibleCard from "~/components/card/CollapsibleCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export default function MatchesCard({
  code,
  team,
  className,
}: {
  code?: string;
  team?: number;
  className?: string;
}) {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [matches, setMatches] = React.useState<Match[] | []>([]);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: obtenerPrimerDiaSemana(new Date()),
    to: obtenerUltimoDiaSemana(new Date()),
  });
  const [fetchError, setFetchError] = React.useState<string | undefined>("");

  const fetchSyncMatches = async (): Promise<void> => {
    const res = await fetchMatches({
      code,
      team,
      date: dateRange,
    });
    if (!res.ok) {
      setFetchError(res.message);
      setIsLoading(false);
    } else {
      setFetchError("");
      setMatches(res.matches ?? []);
    }
    setIsLoading(false);
    setIsMounted(true);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(true);
      void fetchSyncMatches();
    }, 2500);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, team, dateRange]);

  const reloadMatches = () => {
    setIsLoading(true);
    void fetchSyncMatches();
  };

  return (
    <CollapsibleCard title="Matches" className={className}>
      {fetchError && (
        <div className="col-span-full mb-3 text-center text-destructive">
          {fetchError}
        </div>
      )}
      {!isMounted ? (
        <div className="flex h-96 items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin" />
        </div>
      ) : (
        <div>
          <div className="mb-3 flex items-center justify-center gap-x-3">
            <p className="text-sm font-semibold">Filter by date:</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  disabled={isLoading}
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <LoaderCircle className="h-12 w-12 animate-spin" />
            </div>
          ) : matches?.length > 0 ? (
            <Accordion type="single" collapsible className="border-t">
              {matches.map((match: Match) => (
                <AccordionItem
                  key={match.id}
                  value={match.id.toString()}
                  className={cn(
                    match.status === "IN_PLAY" && "bg-secondary",
                    match.status === "PAUSED" && "bg-destructive",
                  )}
                >
                  <AccordionTrigger
                    className="grid grid-cols-3 py-2"
                    style={{ textDecoration: "none" }}
                    showArrow={false}
                  >
                    <p className="flex items-center justify-end gap-2 text-ellipsis text-sm">
                      {match.homeTeam.shortName || match.homeTeam.name}
                      <Image
                        src={match.homeTeam.crest}
                        width={25}
                        height={25}
                        alt="Home Team Crest"
                      />
                    </p>
                    <div>
                      <p className="text-sm">
                        {match.status === "TIMED" &&
                          formatearFecha({
                            fechaISO: match.utcDate,
                            format: "HH:mm",
                          })}
                        {match.status === "IN_PLAY" && "Live"}
                        {match.status === "PAUSED" && "Pause"}
                        {match.status === "FINISHED" && "FT"}
                        {match.status === "POSTPONED" && "POSTPONED"}
                      </p>
                      <p className="text-xs">
                        {match.status === "TIMED" &&
                          formatearFecha({
                            fechaISO: match.utcDate,
                            format: "dd/MM/yyyy",
                          })}
                        {match.status !== "TIMED" &&
                          match.status !== "POSTPONED" &&
                          match.score.fullTime.home +
                            "-" +
                            match.score.fullTime.away}
                      </p>
                    </div>
                    <p className="flex items-center justify-start gap-2 text-ellipsis text-sm">
                      <Image
                        src={match.awayTeam.crest}
                        width={25}
                        height={25}
                        alt="Away Team Crest"
                      />
                      {match.awayTeam.shortName || match.awayTeam.name}
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2" asChild>
                    <Link
                      href={`/dashboard/matches/${match.id}`}
                      className="mx-auto flex w-2/3 flex-col py-2 text-center text-accent-foreground"
                    >
                      <div className="flex flex-col">
                        <p className="text-base font-semibold">
                          {match.competition.name}
                        </p>
                        <p>Matchday #{match.season.currentMatchday}</p>
                        <p>{format(match.utcDate, "yyyy/MM/dd")}</p>
                      </div>
                      {match.status === "FINISHED" && (
                        <div className="grid grid-cols-2 pt-1">
                          <p className="col-span-2 my-1 border-y border-primary border-b-accent text-center text-base">
                            Full time
                          </p>
                          <p className="text-lg font-bold">
                            {match.score.fullTime.home}
                          </p>
                          <p className="text-lg font-bold">
                            {match.score.fullTime.away}
                          </p>
                          <p className="col-span-2 my-1 border-y border-primary border-b-accent text-center text-base">
                            Half time
                          </p>
                          <p className="text-lg font-bold">
                            {match.score.halfTime.home}
                          </p>
                          <p className="text-lg font-bold">
                            {match.score.halfTime.away}
                          </p>
                        </div>
                      )}
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : fetchError ? (
            <div className="flex h-72 items-center justify-center">
              <Button
                variant="link"
                size="icon"
                onClick={() => reloadMatches()}
              >
                <RotateCw className="h-12 w-12" />
              </Button>
            </div>
          ) : (
            <div className="col-span-full text-center">
              No matches in the range
            </div>
          )}
        </div>
      )}
    </CollapsibleCard>
  );
}
