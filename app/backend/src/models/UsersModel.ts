import SequelizeUsers from '../database/models/SequelizeUsers';
import IUsers from '../Interfaces/Users';

export default class UserModel {
  private model = SequelizeUsers;

  async findByEmail(email: string): Promise<IUsers | null> {
    const user = this.model.findOne({ where: { email } });
    if (user == null) return null;
    return user;
  }
}
