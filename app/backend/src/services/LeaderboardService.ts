import { IMatches } from '../Interfaces/matches/Matches';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamModel';
import { LeaderboardType, createLb } from '../types/Leaderboard';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamsModel(),
    private matchesModel = new MatchesModel(),
  ) { }

  private static calculateHome(matches: IMatches[]) {
    return matches.reduce((lbAcc: LeaderboardType, match: IMatches) => {
      if (match.inProgress === true) return lbAcc;
      const lbCalc: LeaderboardType = createLb();
      lbCalc.totalGames = lbAcc.totalGames + 1;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        lbCalc.totalVictories = lbAcc.totalVictories + 1;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) lbCalc.totalDraws = lbAcc.totalDraws + 1;
      if (match.homeTeamGoals < match.awayTeamGoals) lbCalc.totalLosses = lbAcc.totalLosses + 1;
      lbCalc.goalsFavor = lbAcc.goalsFavor + match.homeTeamGoals;
      lbCalc.goalsOwn = lbAcc.goalsOwn + match.awayTeamGoals;
      lbCalc.goalsBalance = lbAcc.goalsFavor - lbAcc.goalsOwn;
      return lbCalc;
    }, createLb());
  }

  async getLeaderboardHome() {
    const homeLeaderboard: LeaderboardType[] = [];
    const teams = await this.teamModel.findAll();
    await Promise.all(teams.map(async (team) => {
      const matches = await this.matchesModel.getHomeTeamMatches(team.id);
      const lbFromMatches = LeaderboardService.calculateHome(matches);
      lbFromMatches.name = team.teamName;
      lbFromMatches.totalPoints = (lbFromMatches.totalVictories * 3) + lbFromMatches.totalDraws;
      const efficiency = (lbFromMatches.totalPoints / (lbFromMatches.totalGames * 3)) * 100;
      lbFromMatches.efficiency = efficiency.toFixed(2);
      homeLeaderboard.push(lbFromMatches);
    }));
    const orderedHomeLb = LeaderboardService.getOrderedLb(homeLeaderboard);
    return { status: 'SUCCESSFUL', data: orderedHomeLb };
  }

  private static calculateAway(matches: IMatches[]) {
    return matches.reduce((lbAcc: LeaderboardType, match: IMatches) => {
      if (match.inProgress === true) return lbAcc;
      const lbCalc: LeaderboardType = createLb();
      lbCalc.totalGames = lbAcc.totalGames + 1;
      if (match.homeTeamGoals < match.awayTeamGoals) {
        lbCalc.totalVictories = lbAcc.totalVictories + 1;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) lbCalc.totalDraws = lbAcc.totalDraws + 1;
      if (match.homeTeamGoals > match.awayTeamGoals) lbCalc.totalLosses = lbAcc.totalLosses + 1;
      lbCalc.goalsFavor = lbAcc.goalsFavor + match.awayTeamGoals;
      lbCalc.goalsOwn = lbAcc.goalsOwn + match.homeTeamGoals;
      // lbCalc.goalsBalance = lbAcc.goalsFavor - lbAcc.goalsOwn;
      return lbCalc;
    }, createLb());
  }

  async getLeaderboardAway() {
    const awayLeaderboard: LeaderboardType[] = [];
    const teams = await this.teamModel.findAll();
    await Promise.all(teams.map(async (team) => {
      const matches = await this.matchesModel.getAwayTeamMatches(team.id);
      const lbFromMatches = LeaderboardService.calculateAway(matches);
      lbFromMatches.name = team.teamName;
      lbFromMatches.totalPoints = (lbFromMatches.totalVictories * 3) + lbFromMatches.totalDraws;
      const efficiency = (lbFromMatches.totalPoints / (lbFromMatches.totalGames * 3)) * 100;
      lbFromMatches.efficiency = efficiency.toFixed(2);
      lbFromMatches.goalsBalance = lbFromMatches.goalsFavor - lbFromMatches.goalsOwn;
      awayLeaderboard.push(lbFromMatches);
    }));
    const orderedAwayLb = LeaderboardService.getOrderedLb(awayLeaderboard);
    return { status: 'SUCCESSFUL', data: orderedAwayLb };
  }

  static getOrderedLb(teams: LeaderboardType[]) {
    const orderedLb = teams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return orderedLb;
  }
}
