// import { NewEntity } from '../Interfaces/index';
// import MatchesModel from '../models/MatchesModel';
// import { IMatches } from '../Interfaces/matches/Matches';
// import { IMatchesModel } from '../Interfaces/matches/MatchesModel';
// import { ServiceResponse } from '../Interfaces/ServiceResponse';

// export default class MatchesService {
//   constructor(
//     private matchesModel: IMatchesModel = new MatchesModel(),
//   ) { }

//   public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
//     const allMatches = await this.matchesModel.findAll();
//     return { status: 'SUCCESSFUL', data: allMatches };
//   }

//   public async getMatchById(id: number): Promise<ServiceResponse<IMatches>> {
//     const match = await this.matchesModel.findById(id);
//     if (!match) return { status: 'NOT_FOUND', data: { message: `match ${id} not found` } };
//     return { status: 'SUCCESSFUL', data: match };
//   }
  
//   public async updateMatch(id: number, match: IMatches): Promise<ServiceResponse<ServiceMessage>> {
//     const matchFound = await this.matchesModel.findById(id);
//     if (!matchFound) return { status: 'NOT_FOUND', data: { message: `match ${id} not found` } };
//     const updatedMatch = await this.matchesModel.update(id, match);
//     if (!updatedMatch) {
//       return { status: 'CONFLICT',
//         data: { message: `There are no updates to perform in Matches ${id}` } };
//     }
//     return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
//   }
//   public async deleteMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
//     const matchFound = await this.matchesModel.findById(id);
//     if (!matchFound) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
//     await this.matchesModel.delete(id);
//     return { status: 'SUCCESSFUL', data: { message: 'Match deleted' } };
//   }
// }
