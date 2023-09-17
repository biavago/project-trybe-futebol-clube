import * as bcrypt from 'bcryptjs';
import UsersModel from '../models/UsersModel';
import ILogin from '../Interfaces/Login';
import { IToken } from '../Interfaces/Token';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import TokenGenerator from '../utils/TokenGenerator';

export default class UsersService {
  constructor(
    private usersModel = new UsersModel(),
  ) {}

  async login(login: ILogin): Promise<ServiceResponse<IToken | ServiceMessage>> {
    const user = await this.usersModel.findByEmail(login.email);
    if (!user || !bcrypt.compareSync(login.password, user.password)) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' },
      };
    }
    const { email } = user;
    const token = TokenGenerator.generateToken({ email });
    return {
      status: 'SUCCESSFUL',
      data: { token },
    };
  }

  async role(email: string): Promise<ServiceResponse<object>> {
    const user = await this.usersModel.findByEmail(email);
    return {
      status: 'SUCCESSFUL',
      data: { role: user?.role },
    };
  }
}
