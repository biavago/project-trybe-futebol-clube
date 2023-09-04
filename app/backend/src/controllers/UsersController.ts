import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import TokenGenerator from '../utils/TokenGenerator';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UsersService from '../services/UsersService';

export default class LoginController {
  constructor(
    private usersService = new UsersService(),
    private tokenGenerator = new TokenGenerator(),
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.usersService.login(email, password);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  role(req: Request, res: Response): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
    }
    try {
      const tokenVerification = this.tokenGenerator.verifyToken(authorization) as JwtPayload;
      return res.status(mapStatusHTTP('SUCCESSFUL')).json({ role: tokenVerification.role });
    } catch (err) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token must be a valid token' });
    }
  }
}
