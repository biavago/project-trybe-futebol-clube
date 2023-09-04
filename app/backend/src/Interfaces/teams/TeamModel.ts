import { ITeam } from './Team';

export interface ITeamModel {
  create(data: Partial<ITeam>): Promise<ITeam>,
  //  retornar todos os livros cadastrados e o livro específico pelo seu id
  findAll(): Promise<ITeam[]>,
  findById(id: ITeam['id']): Promise<ITeam | null>,
  // update(id: IBook['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null>,
  // delete(id: IBook['id']): Promise<number>,
}
