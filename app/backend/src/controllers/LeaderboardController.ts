import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private lbService = new LeaderboardService(),
  ) { }

  public async getAllLb(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.lbService.getAllLeaderboard();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getHomeLb(_req: Request, res: Response): Promise<Response> {
    const homeOrAwayTeam = 'homeTeam';
    const serviceResponse = await this.lbService.getLeaderboard(homeOrAwayTeam);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getAwayLb(_req: Request, res: Response): Promise<Response> {
    const homeOrAwayTeam = 'awayTeam';
    const serviceResponse = await this.lbService.getLeaderboard(homeOrAwayTeam);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
