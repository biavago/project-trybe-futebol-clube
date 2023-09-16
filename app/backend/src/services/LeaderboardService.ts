// import ILeaderboard from '../Interfaces/Leaderboard';
// import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import SequelizeMatches from '../database/models/SequelizeMatches';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamModel';

// const leaderboard: ILeaderboard = {
//   name: '',
//   totalPoints: 0,
//   totalGames: 0,
//   totalVictories: 0,
//   totalDraws: 0,
//   totalLosses: 0,
//   goalsFavor: 0,
//   goalsOwn: 0,
//   goalsBalance: 0,
//   efficiency: 0,
// };

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamsModel(),
    private matchesModel = new MatchesModel(),
  ) {}

  private static efficiencyCalc(totalPoints: number, totalGames: number) {
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }

  // async getLeaderboardHome() {
  //   // const lb = [];
  //   const teams = await this.teamModel.findAll();
  //   const leaderboard = await Promise.all(teams.map(async (team) => {
  //     const matches = await this.matchesModel.getHomeTeamMatches(team.id);
  //     const home = matches.reduce((acc, curr) => acc + curr);
  //   }));

  //   console.log('leaderboard', leaderboard);

  //   return { status: 'SUCCESSFUL', data: [] };
  // }
}
