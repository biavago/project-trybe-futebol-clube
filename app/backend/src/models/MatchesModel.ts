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

  async findById(id: number): Promise<IMatches | null> {
    const match = await this.model.findByPk(id);
    if (match == null) return null;
    return match;
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
    const rowsUpdates = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return rowsUpdates;
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

  async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number[]> {
    const rowsAffected = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return rowsAffected;
  }
}
