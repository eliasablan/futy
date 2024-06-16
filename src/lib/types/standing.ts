export interface FetchStandings {
  filters: Filters;
  area: Area;
  competition: Competition;
  season: Season;
  standings: Standing[];
}

export interface Filters {
  season: string;
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

export interface Standing {
  stage: string;
  type: string;
  group: string;
  table: Table[];
}

export interface Table {
  position: number;
  team: Team;
  playedGames: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}
