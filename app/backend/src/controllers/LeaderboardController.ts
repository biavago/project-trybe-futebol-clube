import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class TeamController {
  constructor(
    private lbService = new LeaderboardService(),
  ) { }

  async getLeaderboardHome(req: Request, res: Response) {
    const serviceResponse = await this.lbService.getLeaderboardHome();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async getLeaderboardAway(req: Request, res: Response) {
    const serviceResponse = await this.lbService.getLeaderboardAway();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
