"use server";
import { formatearDateRange } from "~/lib/utils";
import type { DateRange } from "react-day-picker";

import type { FetchMatches } from "~/lib/types/match";

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
