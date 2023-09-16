import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/matches/Matches';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/matches/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  async create(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatches>> {
    const newMatch = await this.matchesModel.create(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return {
      status: 'CREATED',
      data: newMatch,
    };
  }

  async finish(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.finish(id);
    return {
      status: 'SUCCESSFUL',
      data: { message: 'Finished' },
    };
  }

  async getAllMatches(inProgress: string): Promise<ServiceResponse<IMatches[]>> {
    if (inProgress) {
      const matchInProgress = await this.matchesModel.findByProgressStatus(inProgress === 'true');
      return {
        status: 'SUCCESSFUL',
        data: matchInProgress,
      };
    }
    const allMatches = await this.matchesModel.getAllMatches();
    return {
      status: 'SUCCESSFUL',
      data: allMatches,
    };
  }

  async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.update(id, homeTeamGoals, awayTeamGoals);
    return {
      status: 'SUCCESSFUL',
      data: { message: 'Updated' },
    };
  }
}
