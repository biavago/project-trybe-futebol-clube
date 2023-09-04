// import SequelizeMatches from '../database/models/SequelizeMatches';
// import { IMatches } from '../Interfaces/matches/Matches';
// import { IMatchesModel } from '../Interfaces/matches/MatchesModel';
// import { NewEntity } from '../Interfaces/index';

// export default class MatchesModel implements IMatchesModel {
//   private model = SequelizeMatches;

//   async getAllMatches(): Promise<IMatches[]> {
//     const dbData = await this.model.findAll();
//     return dbData.map(({ 
//       id,
//       home_team_id,
//       home_team_goals,
//       away_team_id,
//       away_team_goals,
//       in_progress }) => ({ 
//         id,
//         home_team_id,
//         home_team_goals,
//         away_team_id,
//         away_team_goals,
//         in_progress }));
//   }

//   async findById(matchId: IMatches['id']): Promise<IMatches | null> {
//     const dbData = await this.model.findByPk(matchId);
//     if (dbData == null) return null;
//     const { id, 
//             home_team_id,
//             home_team_goals,
//             away_team_id,
//             away_team_goals,
//             in_progress }: IMatches = dbData;
//     return { id, home_team_id, home_team_goals, away_team_id, away_team_goals, in_progress };
//   }

//   async update(id: IMatches['id'], data: Partial<NewEntity<IMatches>>): Promise<IMatches | null> {
//     const [affectedRows] = await this.model.update(data, { where: { id } });
//     if (affectedRows === 0) return null;
//     return this.findById(id);
//   }
//   async delete(id: IMatches['id']): Promise<number> {
//     return this.model.destroy({ where: { id } });
//   }
// }
