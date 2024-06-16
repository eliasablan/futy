import type {
  FetchCompetition,
  FetchCompetitions,
} from "~/lib/types/competition";
import type { FetchTeam, FetchTeams } from "~/lib/types/team";
import type { FetchMatch } from "~/lib/types/match";
import type { FetchStandings } from "~/lib/types/standing";

// #region Competitions
export const fetchCompetitions = async (): Promise<FetchCompetitions> => {
  const competitions_url =
    process.env.NEXT_PUBLIC_FBDO_URL + "competitions/" ?? "";
  const auth_token = process.env.NEXT_PUBLIC_FBDO_API_KEY ?? "";

  const res = await fetch(competitions_url, {
    headers: {
      "X-Auth-Token": auth_token,
    },
    // next: {
    //   revalidate: 60 * 60, // 1 hour
    // },
  });

  if (!res.ok) {
    throw new Error("OK Error fetching competitions");
  }

  const data = (await res.json()) as FetchCompetitions;
  return data;
};

export const fetchCompetition = async (
  code: string,
): Promise<FetchCompetition> => {
  const league_url = process.env.NEXT_PUBLIC_FBDO_URL + "competitions/" + code;
  const auth_token = process.env.NEXT_PUBLIC_FBDO_API_KEY ?? "";

  const req = await fetch(league_url, {
    headers: {
      "X-Auth-Token": auth_token,
    },
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  if (!req.ok) {
    throw new Error(`OK Error fetching ${code} competition`);
  }

  const data = (await req.json()) as FetchCompetition;
  return data;
};
// #endregion

// #region Teams
export const fetchTeams = async ({
  page = 1,
  limit = 12,
}): Promise<FetchTeams> => {
  const teams_url =
    process.env.NEXT_PUBLIC_FBDO_URL +
    "teams/" +
    `?limit=${limit}` +
    `&offset=${(page - 1) * limit}`;
  const auth_token = process.env.NEXT_PUBLIC_FBDO_API_KEY ?? "";

  const req = await fetch(teams_url, {
    headers: {
      "X-Auth-Token": auth_token,
    },
    // next: {
    //   revalidate: 60 * 60 * 24, // 1 day
    // },
  });

  if (!req.ok) {
    throw new Error("OK Error fetching teams");
  }

  const data = (await req.json()) as FetchTeams;
  return data;
};

export const fetchTeam = async (id: number): Promise<FetchTeam> => {
  const team_url = process.env.NEXT_PUBLIC_FBDO_URL + "teams/" + id;
  const auth_token = process.env.NEXT_PUBLIC_FBDO_API_KEY ?? "";

  const req = await fetch(team_url, {
    headers: {
      "X-Auth-Token": auth_token,
    },
    next: {
      revalidate: 60 * 60 * 24, // 1 day
    },
  });

  if (!req.ok) {
    throw new Error(`OK Error fetching ${id} team`);
  }

  const data = (await req.json()) as FetchTeam;
  return data;
};
// #endregion

// #region Matches
export const fetchMatch = async (id: number): Promise<FetchMatch> => {
  const team_url = process.env.NEXT_PUBLIC_FBDO_URL + "matches/" + id;
  const auth_token = process.env.NEXT_PUBLIC_FBDO_API_KEY ?? "";

  const req = await fetch(team_url, {
    headers: {
      "X-Auth-Token": auth_token,
    },
    next: {
      revalidate: 60,
    },
  });

  if (!req.ok) {
    throw new Error(`OK Error fetching match ${id}`);
  }

  const data = (await req.json()) as FetchMatch;
  return data;
};
// #endregion

// #region Standings
export const fetchStandings = async (code: string): Promise<FetchStandings> => {
  const competition_url =
    `${process.env.NEXT_PUBLIC_FBDO_URL}competitions/${code}/standings` ?? "";
  const auth_token = process.env.NEXT_PUBLIC_FBDO_API_KEY ?? "";

  const req = await fetch(competition_url, {
    headers: {
      "X-Auth-Token": auth_token,
    },
    next: {
      revalidate: 600, // 10 minutes
    },
  });

  if (!req.ok) {
    throw new Error(`OK Error fetching ${code} standings`);
  }

  const data = (await req.json()) as FetchStandings;
  return data;
};
// #endregion
