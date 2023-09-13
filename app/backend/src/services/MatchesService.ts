import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/matches/Matches';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
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
    return { status: 'CREATED', data: newMatch };
  }

  async findById(id: number): Promise<ServiceResponse<IMatches>> {
    const match = await this.matchesModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: match };
  }

  async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.getAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.update(id, homeTeamGoals, awayTeamGoals);
    return {
      status: 'SUCCESSFUL', data: { message: 'Match updated' },
    };
  }

  async finish(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchesModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `match ${id} not found` } };
    await this.matchesModel.finish(id);
    return {
      status: 'SUCCESSFUL', data: { message: 'Finished' },
    };
  }
}
