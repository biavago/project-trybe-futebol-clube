import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UsersService from '../services/UsersService';

export default class LoginController {
  constructor(
    private usersService = new UsersService(),
  ) {}

  async login(req: Request, res: Response) {
    const email = req.body;
    const serviceResponse = await this.usersService.login(email);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async role(req: Request, res: Response) {
    const { email } = req.body.payload;
    const serviceResponse = await this.usersService.role(email);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
