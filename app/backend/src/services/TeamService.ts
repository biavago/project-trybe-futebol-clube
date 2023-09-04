import { NewEntity } from '../Interfaces/index';
import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/teams/Team';
import { ITeamModel } from '../Interfaces/teams/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async createTeam(team: NewEntity<ITeam>): Promise<ServiceResponse<ITeam>> {
    const newTeam = await this.teamModel.create(team);
    return { status: 'SUCCESSFUL', data: newTeam };
  }
  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
  
  // public async updateBook(id: number, book: IBook): Promise<ServiceResponse<ServiceMessage>> {
  //   const bookFound = await this.bookModel.findById(id);
  //   if (!bookFound) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };
  //   const updatedBook = await this.bookModel.update(id, book);
  //   if (!updatedBook) {
  //     return { status: 'CONFLICT',
  //       data: { message: `There are no updates to perform in Book ${id}` } };
  //   }
  //   return { status: 'SUCCESSFUL', data: { message: 'Book updated' } };
  // }
  // public async deleteBook(id: number): Promise<ServiceResponse<ServiceMessage>> {
  //   const bookFound = await this.bookModel.findById(id);
  //   if (!bookFound) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };
  //   await this.bookModel.delete(id);
  //   return { status: 'SUCCESSFUL', data: { message: 'Book deleted' } };
  // }
}
