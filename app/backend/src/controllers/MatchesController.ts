// import { Request, Response } from 'express';
// import MatchesService from '../services/MatchesService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';
// import { match } from 'assert';

// export default class TeamController {
//   constructor(
//     private matchesService = new MatchesService(),
//   ) { }

//   public async getAllMatches(_req: Request, res: Response) {
//     const serviceResponse = await this.matchesService.getAllMatches();
//     res.status(200).json(serviceResponse.data);
//   }

//   public async getMatchById(req: Request, res: Response) {
//     const { id } = req.params;
//     const serviceResponse = await this.matchesService.getMatchById(Number(id));
//     if (serviceResponse.status !== 'SUCCESSFUL') {
//       return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
//     }
//     res.status(200).json(serviceResponse.data);
//   }

//   public async updateMatch(req: Request, res: Response): Promise<Response> {
//     const id = Number(req.params.id);
//     const match = req.body;
//     const serviceResponse = await this.matchesService.updateMatch(id, match);
//     if (serviceResponse.status !== 'SUCCESSFUL') {
//       return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
//     }
//     return res.status(200).json(serviceResponse.data);
//   }
//   public async deleteMatch(req: Request, res: Response): Promise<Response> {
//     const id = Number(req.params.id);
//     const serviceResponse = await this.matchesService.deleteMatch(id);
//     if (serviceResponse.status !== 'SUCCESSFUL') {
//       return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
//     }
//     return res.status(200).json(serviceResponse.data);
//   }
// }
