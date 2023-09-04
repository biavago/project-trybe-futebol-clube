import SequelizeUsers from '../database/models/SequelizeUsers';
import IUsers from '../Interfaces/Users';

export default class UserModel {
  private model = SequelizeUsers;

  findByEmail(email: string): Promise<IUsers | null> {
    const userFound = this.model.findOne({ where: { email } });
    return userFound;
  }
}
