import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';
import ITeamModel from '../models/TeamModel';
import { LeaderboardType } from '../types/Leaderboard';
import lbCalc from '../utils/lbCalc';
import { IMatchesModel } from '../Interfaces/matches/MatchesModel';
import MatchesModel from '../models/MatchesModel';

export default class LeaderboardService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  async createLeaderboard(): Promise<LeaderboardType[]> {
    const leaderboard: LeaderboardType[] = [];
    const teams = await this.teamModel.findAll();
    teams.forEach((team) => leaderboard
      .push(lbCalc.createLb(team.teamName)));
    return leaderboard;
  }

  async writeOnLeaderboard(homeOrAwayTeam: string): Promise<LeaderboardType[]> {
    const leaderboard = await this.createLeaderboard();
    const matches = await this.matchesModel.findByProgressStatus(false);
    matches.forEach((match) => {
      leaderboard.forEach((stucture, i) => {
        leaderboard[i] = lbCalc.writeLb(match, stucture, homeOrAwayTeam);
      });
    });
    return leaderboard;
  }

  async mergeLeaderboard(): Promise<LeaderboardType[]> {
    const leaderboardHome = await this.writeOnLeaderboard('homeTeam');
    const leaderboardAway = await this.writeOnLeaderboard('awayTeam');
    const leaderboard = lbCalc.mergeLeaderboard(leaderboardHome, leaderboardAway);
    return leaderboard;
  }

  async getLeaderboard(homeOrAwayTeam: string): Promise<ServiceResponse<LeaderboardType[]>> {
    const homeOrAwayLb = await this.writeOnLeaderboard(homeOrAwayTeam);
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
