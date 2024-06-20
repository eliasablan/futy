"use server";
import { formatearDateRange } from "~/lib/utils";
import type { DateRange } from "react-day-picker";

import type { FetchMatches } from "~/lib/types/match";
import {
  teamsFollows,
  competitionsFollows,
  playersFollows,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";
import assert from "assert";
import { db } from "~/server/db";

// #region Matches
export const fetchMatches = async ({
  code,
  team,
  date,
}: {
  code?: string;
  team?: number;
  date?: DateRange;
}): Promise<FetchMatches> => {
  let matches_url = process.env.NEXT_PUBLIC_FBDO_URL ?? null;
  if (matches_url) {
    if (code) matches_url += "competitions/" + code;
    if (team) matches_url += "teams/" + team;
    matches_url += "/matches?" + formatearDateRange(date);
  }

  const auth_token = process.env.NEXT_PUBLIC_FBDO_API_KEY ?? "";

  if (!matches_url) {
    throw new Error("Error generating API URL");
  }

  const req = await fetch(new URL(matches_url), {
    headers: {
      "X-Auth-Token": auth_token,
    },
    next: {
      revalidate: 60,
    },
  });

  const data = (await req.json()) as FetchMatches;
  data.ok = true;
  if (data.errorCode) {
    data.ok = false;
  }
  return data;
};
// #endregion

// #region Teams
export const handleTeamFollow = async ({
  followingId,
  team,
  user,
  action,
}: {
  followingId?: number;
  team: number;
  user: string;
  action: boolean;
}) => {
  assert(team, '"team" is required');
  assert(user, '"user" is required');

  if (followingId) {
    const response = await db
      .update(teamsFollows)
      .set({ active: action })
      .where(eq(teamsFollows.id, followingId))
      .returning({
        id: teamsFollows.id,
        active: teamsFollows.active,
      });
    return response;
  }

  const response = await db
    .insert(teamsFollows)
    .values({
      teamId: team,
      userId: user,
      active: action,
    })
    .returning({
      id: teamsFollows.id,
      active: teamsFollows.active,
    });
  return response;
};
// #endregion

// #region Competitions
export const handleCompetitionFollow = async ({
  followingId,
  competition,
  user,
  action,
}: {
  followingId?: number;
  competition: string;
  user: string;
  action: boolean;
}) => {
  assert(competition, '"competition" is required');
  assert(user, '"user" is required');

  if (followingId) {
    const response = await db
      .update(competitionsFollows)
      .set({ active: action })
      .where(eq(competitionsFollows.id, followingId))
      .returning({
        id: competitionsFollows.id,
        active: competitionsFollows.active,
      });
    return response;
  }

  const response = await db
    .insert(competitionsFollows)
    .values({
      competitionCode: competition,
      userId: user,
      active: action,
    })
    .returning({
      id: competitionsFollows.id,
      active: competitionsFollows.active,
    });
  return response;
};
// #endregion

// #region Players
export const handlePlayerFollow = async ({
  followingId,
  player,
  user,
  action,
}: {
  followingId?: number;
  player: number;
  user: string;
  action: boolean;
}) => {
  assert(player, '"player" is required');
  assert(user, '"user" is required');

  if (followingId) {
    console.log("flag");
    const response = await db
      .update(playersFollows)
      .set({ active: action })
      .where(eq(playersFollows.id, followingId))
      .returning({ id: playersFollows.id, active: playersFollows.active });
    return response;
  }

  const response = await db
    .insert(playersFollows)
    .values({
      playerId: player,
      userId: user,
      active: action,
    })
    .returning({ id: playersFollows.id, active: playersFollows.active });
  return response;
};
// #endregion
