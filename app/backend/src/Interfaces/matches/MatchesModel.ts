import { IMatches } from './Matches';

export interface IMatchesModel {
  create(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatches>,
  findById(id: number): Promise<IMatches | null>,
  findByProgressStatus(inProgressStatus: boolean): Promise<IMatches[]>,
  finish(id: number): Promise<number[]>;
  getAllMatches(): Promise<IMatches[]>,
  update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number
  ): Promise<number[]>;
}
