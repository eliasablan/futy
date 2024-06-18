import type { Area, Contract, RunningCompetition } from "./team";

export interface FetchPlayer {
  ok: boolean;
  errorCode?: string;
  message?: string;
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  section: string;
  position: string;
  shirtNumber: number;
  lastUpdated: string;
  currentTeam: CurrentTeam;
}

export interface CurrentTeam {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: RunningCompetition[];
  contract: Contract;
}
