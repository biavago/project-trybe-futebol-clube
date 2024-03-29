import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/teams/Team';
import { ITeamModel } from '../Interfaces/teams/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
