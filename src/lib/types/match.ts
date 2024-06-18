export interface FetchMatches {
  ok: boolean;
  code?: number;
  message?: string;
  filters?: Filters;
  resultSet?: ResultSet;
  matches?: Match[];
  errorCode?: string;
}

export interface FetchMatch extends Match {
  ok: boolean;
  errorCode?: number;
  message?: string;
  filters?: Filters;
  resultSet?: ResultSet;
  match?: Match;
}

export interface Filters {
  dateFrom: string;
  dateTo: string;
  permission: string;
}

export interface ResultSet {
  count: number;
  competitions: string;
  first: string;
  last: string;
  played: number;
}

export interface Match {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group: any;
  lastUpdated: string;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
  score: Score;
  odds: Odds;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  referees: any[];
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  winner: any;
}

export interface HomeTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface AwayTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Score {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  winner: any;
  duration: string;
  fullTime: FullTime;
  halfTime: HalfTime;
}

export interface FullTime {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  home: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  away: any;
}

export interface HalfTime {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  home: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  away: any;
}

export interface Odds {
  msg: string;
}
