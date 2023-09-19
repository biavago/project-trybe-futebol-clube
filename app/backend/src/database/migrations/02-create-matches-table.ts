import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatches from '../../Interfaces/matches/Matches';
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatches>>('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      homeTeamId: {
        allowNull: false,
        field: 'home_team_id',
        type: DataTypes.INTEGER,
      },
      homeTeamGoals: {
        allowNull: false,
        field: 'home_team_goals',
        type: DataTypes.INTEGER,
      },
      awayTeamId: {
        allowNull: false,
        field: 'away_team_id',
        type: DataTypes.INTEGER,
      },
      awayTeamGoals: {
        allowNull: false,
        field: 'away_team_goals',
        type: DataTypes.INTEGER,
      },
      inProgress: {
        allowNull: false,
        field: 'in_progress',
        type: DataTypes.BOOLEAN,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};
