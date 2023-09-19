import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../Interfaces/teams/TeamModel';
import { LeaderboardType } from '../types/Leaderboard';
import lbCalc from '../utils/lbCalc';
import { IMatchesModel } from '../Interfaces/matches/MatchesModel';
import MatchesModel from '../models/MatchesModel';

export default class LeaderboardService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  async createLb(): Promise<LeaderboardType[]> {
    const leaderboard: LeaderboardType[] = [];
    const teams = await this.teamModel.findAll();
    teams.forEach((team) => leaderboard
      .push(lbCalc.createLb(team.teamName)));
    return leaderboard;
  }

  async writeLb(homeOrAwayTeam: string): Promise<LeaderboardType[]> {
    const leaderboard = await this.createLb();
    const matches = await this.matchesModel.findByProgressStatus(false);
    matches.forEach((match) => {
      leaderboard.forEach((board, index) => {
        leaderboard[index] = lbCalc.writeLb(match, board, homeOrAwayTeam);
      });
    });
    return leaderboard;
  }

  async mergeLeaderboard(): Promise<LeaderboardType[]> {
    const homeLb = await this.writeLb('homeTeam');
    const awayLb = await this.writeLb('awayTeam');
    const leaderboard = lbCalc.mergeLeaderboard(homeLb, awayLb);
    return leaderboard;
  }

  async getLeaderboard(homeOrAwayTeam: string): Promise<ServiceResponse<LeaderboardType[]>> {
    const homeOrAwayLb = await this.writeLb(homeOrAwayTeam);
    const leaderboard = lbCalc.getOrderedLb(homeOrAwayLb);
    return {
      status: 'SUCCESSFUL',
      data: leaderboard,
    };
  }

  async getAllLeaderboard(): Promise<ServiceResponse<LeaderboardType[]>> {
    const leaderboard = await this.mergeLeaderboard();
    return {
      status: 'SUCCESSFUL',
      data: leaderboard,
    };
  }
}
