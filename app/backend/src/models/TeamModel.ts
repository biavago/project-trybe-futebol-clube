import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/Team';
import { ITeamModel } from '../Interfaces/teams/TeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }

  async findById(teamId: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(teamId);
    if (team == null) return null;
    return team;
  }
}
