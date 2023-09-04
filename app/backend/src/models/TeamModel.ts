import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/Team';
import { ITeamModel } from '../Interfaces/teams/TeamModel';
import { NewEntity } from '../Interfaces/index';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async create(data: NewEntity<ITeam>): Promise<ITeam> {
    const dbData = await this.model.create(data);
    const { id, team_name }: ITeam = dbData;
    return { id, team_name };
  }

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, team_name }) => (
    { id, team_name }
    ));
  }

  async findById(teamId: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(teamId);
    if (dbData == null) return null;
    const { id, team_name }: ITeam = dbData;
    return { id, team_name };
  }

  // async update(id: IBook['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null> {
  //   const [affectedRows] = await this.model.update(data, { where: { id } });
  //   if (affectedRows === 0) return null;
  //   return this.findById(id);
  // }
  // async delete(id: IBook['id']): Promise<number> {
  //   return this.model.destroy({ where: { id } });
  // }
}
