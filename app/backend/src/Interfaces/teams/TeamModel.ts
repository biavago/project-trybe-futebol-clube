import { ITeam } from './Team';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>,
  findById(teamId: number): Promise<ITeam | null>,
}
