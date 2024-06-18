"use server";
import { formatearDateRange } from "~/lib/utils";
import type { DateRange } from "react-day-picker";

import type { FetchMatches } from "~/lib/types/match";
import { db } from "~/server/db";
import { teamFollowers } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import assert from "assert";

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
export const isFollowing = async ({
  team,
  user,
}: {
  team?: string;
  user?: string;
}) => {
  assert(team, "teamId is required");
  assert(user, "userId is required");
  const req = await db.query.teamFollowers.findFirst({
    where: eq(teamFollowers.userId, user) && eq(teamFollowers.teamId, team),
  });
  return req?.active;
};

export const followTeam = async ({
  team,
  user,
  action,
}: {
  team?: string;
  user?: string;
  action: boolean;
}) => {
  assert(team, "teamId is required");
  assert(user, "userId is required");

  const existingFollower = await db.query.teamFollowers.findFirst({
    where: eq(teamFollowers.userId, user) && eq(teamFollowers.teamId, team),
  });

  // Modify record if already interacted with the team before
  if (existingFollower) {
    const res = await db
      .update(teamFollowers)
      .set({ active: action })
      .where(eq(teamFollowers.userId, user) && eq(teamFollowers.teamId, team));
    console.log({ res });
    return res;
  }
  // Create record if never interacted with the team before
  const res = await db.insert(teamFollowers).values({
    teamId: team,
    userId: user,
    active: action,
  });
  console.log({ res });

  return res;
};
