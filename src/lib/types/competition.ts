interface Area {
  id: number;
  name: string;
  code: string;
  flag?: string;
}

interface CurrentSeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  winner: any;
}

export interface FetchCompetitions {
  ok: boolean;
  errorCode?: number;
  message?: string;
  count?: number;
  filter?: Filter;
  competitions?: FetchCompetition[];
}

interface Filter {
  id?: number;
  name?: string;
  code?: string;
  client?: string;
}

export interface FetchCompetition {
  ok: boolean;
  errorCode?: number;
  message?: string;
  id: number;
  area: Area;
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
  currentSeason: CurrentSeason;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
}
