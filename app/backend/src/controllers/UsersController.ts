import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UsersService from '../services/UsersService';

export default class LoginController {
  constructor(
    private usersService = new UsersService(),
  ) {}

  async login(req: Request, res: Response) {
    const serviceResponse = await this.usersService.login(req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  async role(req: Request, res: Response) {
    const serviceResponse = await this.usersService.role(req.body.payload);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
