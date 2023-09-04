import UsersModel from '../models/UsersModel';
import IUsers from '../Interfaces/Users';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Encrypter from '../utils/Encrypter';
import TokenGenerator from '../utils/TokenGenerator';

export default class UsersService {
  private encrypter = new Encrypter();
  private tokenGenerator = new TokenGenerator();

  constructor(
    private usersModel = new UsersModel(),
  ) {}

  async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user: IUsers | null = await this.usersModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const userPassword = await this.encrypter.compare(password, user.password);
    if (!userPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL',
      data: { token: this.tokenGenerator.generateToken({ email, role: user.role }) } };
  }
}
