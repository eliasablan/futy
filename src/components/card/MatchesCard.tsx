"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { LoaderCircle, RotateCw, ShapesIcon } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function MatchesCard({
  code,
  team,
  className,
}: {
  code?: string;
  team?: number;
  className?: string;
}) {
  // #region State and constants
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [matches, setMatches] = useState<Match[] | []>([]);
  const [allMatches, setAllMatches] = useState<Match[] | []>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: obtenerPrimerDiaSemana(new Date()),
    to: obtenerUltimoDiaSemana(new Date()),
  });
  const [error, setError] = useState<
    { message: string; code: string } | undefined
  >();
  const statusOptions = [
    { label: "All games", value: "ALL" },
    { label: "Finished", value: "FINISHED" },
    { label: "In Play", value: "IN_PLAY" },
    { label: "Paused", value: "PAUSED" },
    { label: "Timed", value: "TIMED" },
    { label: "Scheduled", value: "SCHEDULED" },
    { label: "Postponed", value: "POSTPONED" },
  ];
  // #endregion

  // #region Fetch matches logic
  const fetchSyncMatches = async (): Promise<void> => {
    setError(undefined);
    const res = await fetchMatches({
      code,
      team,
      date: dateRange,
    });
    if (!res.ok) {
      setError({ message: res.message!, code: res.errorCode! });
    } else {
      setAllMatches(res.matches ?? []);
      if (statusFilter === "ALL") {
        setMatches(res.matches ?? []);
      } else {
        setMatches(allMatches.filter((match) => match.status === statusFilter));
      }
    }
    setIsLoading(false);
  };
  // #endregion

  // #region Date range filter refetch logic
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(true);
      void fetchSyncMatches();
    }, 2500);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, team, dateRange]);
  // #endregion

  // #region Status filter logic
  useEffect(() => {
    if (statusFilter === "ALL") {
      setMatches(allMatches);
    } else {
      setMatches(allMatches.filter((match) => match.status === statusFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);
  // #endregion

  // #region Reload matches logic
  const reloadMatches = () => {
    setIsLoading(true);
    void fetchSyncMatches();
  };
  // #endregion
  return (
    <CollapsibleCard title="Matches" className={className}>
      <div>
        <div className="mb-3 flex items-center justify-between gap-x-3">
          {/* Date range filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                disabled={isLoading}
                variant="outline"
                className={cn(
                  "item justify-start text-left font-normal",
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
          {/* Status filter */}
          <Select
            onValueChange={setStatusFilter}
            defaultValue="ALL"
            disabled={isLoading}
          >
            <SelectTrigger className="w-40">
              <ShapesIcon className="h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <LoaderCircle className="h-12 w-12 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center text-center">
            <p className="text-destructive">{error.message}</p>
            <div className="flex h-72 items-center justify-center">
              <Button
                variant="link"
                size="icon"
                onClick={() => reloadMatches()}
              >
                <RotateCw className="h-12 w-12" />
              </Button>
            </div>
          </div>
        ) : matches.length > 0 ? (
          <Accordion type="single" collapsible className="border-t">
            {matches.map((match: Match) => {
              return (
                <AccordionItem
                  key={match.id}
                  value={match.id.toString()}
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  <AccordionTrigger
                    className="grid grid-cols-3 py-2"
                    style={{ textDecoration: "none" }}
                    showArrow={false}
                  >
                    <p className="flex items-center justify-end gap-2 text-ellipsis text-sm">
                      {match.homeTeam.shortName || match.homeTeam.name || (
                        <span className="text-warning">Not Defined Yet</span>
                      )}
                      {match.homeTeam.crest && (
                        <Image
                          src={match.homeTeam.crest}
                          width={25}
                          height={25}
                          alt="Home Team Crest"
                        />
                      )}
                    </p>

                    {/* Scoreboards */}
                    {match.status === "FINISHED" ? (
                      <div className="w-22 mx-auto rounded-md border-2 bg-accent p-1 text-accent-foreground">
                        <p className="font-mono text-lg font-semibold leading-5">
                          {match.score.fullTime.home}
                          {":"}
                          {match.score.fullTime.away}
                        </p>
                        <p className="text-xs">Finished</p>
                      </div>
                    ) : match.status === "IN_PLAY" ? (
                      <div className="w-22 mx-auto rounded-md border-2 border-warning bg-warning p-1 text-warning-foreground dark:border-warning-foreground dark:bg-warning-foreground dark:text-warning">
                        <p className="font-mono text-lg font-semibold leading-5">
                          {match.score.fullTime.home}
                          {":"}
                          {match.score.fullTime.away}
                        </p>
                        <p className="text-xs">
                          <span>Playing</span>
                        </p>
                      </div>
                    ) : match.status === "PAUSED" ? (
                      <div className="w-22 mx-auto rounded-md border-2 bg-success p-1 text-success-foreground">
                        <p className="font-mono text-lg font-semibold leading-5">
                          {match.score.fullTime.home}
                          {":"}
                          {match.score.fullTime.away}
                        </p>
                        <p className="text-xs">
                          <span>HT</span>
                        </p>
                      </div>
                    ) : match.status === "TIMED" ||
                      match.status === "SCHEDULED" ? (
                      <div className="w-22 mx-auto rounded-md border-2 border-primary bg-primary p-1 text-primary-foreground dark:border-primary">
                        <p className="font-mono text-lg font-semibold lowercase leading-5">
                          {formatearFecha({
                            fechaISO: match.utcDate,
                            format: "HH:mm",
                          })}
                        </p>
                        <p className="text-xs">
                          {formatearFecha({
                            fechaISO: match.utcDate,
                            format: "dd MMM",
                          })}
                        </p>
                      </div>
                    ) : match.status === "POSTPONED" ? (
                      <div className="w-22 mx-auto rounded-md border-2 bg-destructive p-1 text-destructive-foreground">
                        <p className="font-mono text-lg font-semibold leading-5">
                          {formatearFecha({
                            fechaISO: match.utcDate,
                            format: "HH:mm",
                          })}
                        </p>
                        <p className="text-xs">
                          {formatearFecha({
                            fechaISO: match.utcDate,
                            format: "dd/MM/yy",
                          })}
                        </p>
                      </div>
                    ) : null}

                    <p className="flex items-center justify-start gap-2 text-ellipsis text-sm">
                      {match.awayTeam.crest && (
                        <Image
                          src={match.awayTeam.crest}
                          width={25}
                          height={25}
                          alt="Away Team Crest"
                        />
                      )}
                      {match.awayTeam.shortName || match.awayTeam.name || (
                        <span className="text-warning">Not Defined Yet</span>
                      )}
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="py-2" asChild>
                    <Link
                      href={`/dashboard/matches/${match.id}`}
                      className="mx-auto flex w-2/3 flex-col py-2 text-center"
                    >
                      <div className="flex flex-col py-2">
                        <p className="text-lg">{match.competition.name}</p>
                        <p className="pb-1 text-lg capitalize text-warning">
                          {match.stage.replace("_", " ").toLowerCase()}
                        </p>
                        <p className="font-mono font-medium">
                          Matchday #{match.season.currentMatchday}
                        </p>
                        {match.status === "TIMED" ||
                          (match.status === "POSTPONED" && (
                            <p>{format(match.utcDate, "yyyy/MM/dd")}</p>
                          ))}
                      </div>
                      {match.status === "FINISHED" ? (
                        <div className="grid grid-cols-2 pt-1">
                          <p className="col-span-2 my-1 border-b border-b-accent py-1 text-center text-sm font-semibold">
                            Full time
                          </p>
                          <p className="font-mono text-4xl font-bold">
                            {match.score.fullTime.home}
                          </p>
                          <p className="font-mono text-4xl font-bold">
                            {match.score.fullTime.away}
                          </p>
                          <p className="col-span-2 my-1 border-b border-b-accent py-1 text-center text-sm font-semibold">
                            Half time
                          </p>
                          <p className="font-mono text-4xl font-bold">
                            {match.score.halfTime.home}
                          </p>
                          <p className="font-mono text-4xl font-bold">
                            {match.score.halfTime.away}
                          </p>
                        </div>
                      ) : match.status === "IN_PLAY" ? (
                        <div className="grid grid-cols-2 pt-1">
                          <p className="col-span-2 my-1 border-b border-b-accent py-1 text-center text-sm font-semibold">
                            Half time
                          </p>
                          <p className="font-mono text-4xl font-bold">
                            {match.score.fullTime.home}
                          </p>
                          <p className="font-mono text-4xl font-bold">
                            {match.score.fullTime.away}
                          </p>
                        </div>
                      ) : match.status === "PAUSED" ? (
                        <div className="grid grid-cols-2 pt-1">
                          <p className="col-span-2 my-1 border-b border-b-accent py-1 text-center text-sm font-semibold">
                            Half time
                          </p>
                          <p className="font-mono text-4xl font-bold">
                            {match.score.fullTime.home}
                          </p>
                          <p className="font-mono text-4xl font-bold">
                            {match.score.fullTime.away}
                          </p>
                        </div>
                      ) : null}
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="flex h-72 items-center justify-center text-destructive">
            No games matching your filters
          </div>
        )}
      </div>
    </CollapsibleCard>
  );
}
