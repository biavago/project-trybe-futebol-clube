import { Op } from 'sequelize';
import SequelizeMatches from '../database/models/SequelizeMatches';
import TeamModel from '../database/models/SequelizeTeam';
import { IMatches } from '../Interfaces/matches/Matches';
import { IMatchesModel } from '../Interfaces/matches/MatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async create(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatches> {
    const newMatch = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }

  async findByProgressStatus(progressStatus: boolean): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: progressStatus },
    });
    return matches;
  }

  async finish(id: number): Promise<number[]> {
    const rowsUpdated = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return rowsUpdated;
  }

  async getAllMatches(): Promise<IMatches[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  async getHomeTeamMatches(teamId: number): Promise<IMatches[]> {
    const homeTeamMatches = await this.model.findAll({ where: { homeTeamId: teamId } });
    return homeTeamMatches;
  }

  async getAwayTeamMatches(teamId: number): Promise<IMatches[]> {
    const awayTeamMatches = await this.model.findAll({ where: { awayTeamId: teamId } });
    return awayTeamMatches;
  }

  async getAllTeamsMatches(teamId: number): Promise<IMatches[]> {
    const allTeamsMatches = await this.model.findAll({
      where: {
        [Op.or]: [
          { homeTeamId: teamId },
          { awayTeamId: teamId },
        ],
      },
    });
    return allTeamsMatches;
  }

  async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number[]> {
    const rowsUpdated = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return rowsUpdated;
  }
}
