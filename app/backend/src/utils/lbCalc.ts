import IMatches from '../Interfaces/matches/Matches';
import { LeaderboardType } from '../types/Leaderboard';

const createLb = (teamName: string): LeaderboardType => ({
  name: teamName,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0.0',
});

const victory = (homeTeamGoals: number, awayTeamGoals: number): string => {
  if (homeTeamGoals > awayTeamGoals) {
    return 'homeTeam';
  }
  if (awayTeamGoals > homeTeamGoals) {
      return 'awayTeam';
  } 
  return 'draw';
};

const goalsCalc = (newLb: LeaderboardType, match: IMatches, homeOrAwayTeam: string) => {
  const leaderboard = { ...newLb };
  leaderboard.goalsFavor = newLb.goalsFavor;
  leaderboard.goalsOwn = newLb.goalsOwn;
  if (homeOrAwayTeam === 'homeTeam') {
    leaderboard.goalsFavor += match.homeTeamGoals;
    leaderboard.goalsOwn += match.awayTeamGoals;
  } else if (homeOrAwayTeam === 'awayTeam') {
    leaderboard.goalsFavor += match.awayTeamGoals;
    leaderboard.goalsOwn += match.homeTeamGoals;
  }
  leaderboard.goalsBalance = (leaderboard.goalsFavor - leaderboard.goalsOwn);
  leaderboard.efficiency = `${((newLb
    .totalPoints / (newLb.totalGames * 3)) * 100).toFixed(2)}`;
  return leaderboard;
};

const writeLb = (match: IMatches, leaderboard: LeaderboardType, homeOrAwayTeam: string) => {
  let newLb = { ...leaderboard };
  const homeOrAway = homeOrAwayTeam === 'homeTeam'
    ? match.homeTeam?.teamName : match.awayTeam?.teamName;

  if (leaderboard.name === homeOrAway) {
    const winner = victory(match.homeTeamGoals, match.awayTeamGoals);

    if (winner === homeOrAwayTeam) {
      newLb.totalPoints += 3;
      newLb.totalVictories += 1;
    } else if (winner === 'draw') {
      newLb.totalPoints += 1;
      newLb.totalDraws += 1;
    } else newLb.totalLosses += 1;
    newLb.totalGames += 1;
    newLb = goalsCalc(newLb, match, homeOrAwayTeam);
  }
  return newLb;
};

const mergeBoards = (
  homeLb: LeaderboardType,
  awayLb: LeaderboardType,
): LeaderboardType => {
  const leaderboard = { ...homeLb };
  leaderboard.totalPoints += awayLb.totalPoints;
  leaderboard.totalGames += awayLb.totalGames;
  leaderboard.totalVictories += awayLb.totalVictories;
  leaderboard.totalDraws += awayLb.totalDraws;
  leaderboard.totalLosses += awayLb.totalLosses;
  leaderboard.goalsFavor += awayLb.goalsFavor;
  leaderboard.goalsOwn += awayLb.goalsOwn;
  leaderboard.goalsBalance = leaderboard.goalsFavor - leaderboard.goalsOwn;
  leaderboard.efficiency = `${((leaderboard
    .totalPoints / (leaderboard.totalGames * 3)) * 100).toFixed(2)}`;
  return leaderboard;
};

const mergeLeaderboard = (
    homeLb: LeaderboardType[],
    awayLb: LeaderboardType[],
): LeaderboardType[] => {
  const mergedLeaderboard: LeaderboardType[] = [];
  homeLb.forEach((homeLb) => {
    const structureAway = awayLb
      .find((structure) => structure.name === homeLb.name);
    if (structureAway) {
      const mergedBoard = mergeBoards(homeLb, structureAway);
      mergedLeaderboard.push(mergedBoard);
    }
  });
  return getOrderedLb(mergedLeaderboard);
};

const getOrderedLb = (teams: LeaderboardType[]) => {
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

export default {
    mergeLeaderboard,
    mergeBoards,
    getOrderedLb,
    writeLb,
    goalsCalc,
    victory,
    createLb,
}
