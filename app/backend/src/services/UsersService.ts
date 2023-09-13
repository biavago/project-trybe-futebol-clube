import * as bcrypt from 'bcryptjs';
import UsersModel from '../models/UsersModel';
import ILogin from '../Interfaces/Login';
import { IToken } from '../Interfaces/Token';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import TokenGenerator from '../utils/TokenGenerator';
import IUsers from '../Interfaces/Users';

export default class UsersService {
  constructor(
    private usersModel = new UsersModel(),
  ) {}

  public async login(login: ILogin): Promise<ServiceResponse<IToken | ServiceMessage>> {
    const user: IUsers | null = await this.usersModel.findByEmail(login.email);
    if (!user || !bcrypt.compareSync(login.password, user.password)) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' },
      };
    }
    const { email, password } = user;
    const token = TokenGenerator.generateToken({ email, password });
    return {
      status: 'SUCCESSFUL',
      data: { token },
    };
  }

  public async role(email: string): Promise<ServiceResponse<object>> {
    const user = await this.usersModel.findByEmail(email);
    return {
      status: 'SUCCESSFUL',
      data: { role: user?.role },
    };
  }
}
