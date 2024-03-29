import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';
import TokenGenerator from '../utils/TokenGenerator';

export default class Validations {
  static async validateMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const teamsService = new TeamService();
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    const home = (await teamsService.getTeamById(homeTeamId)).status;
    const away = (await teamsService.getTeamById(awayTeamId)).status;
    if (home === 'NOT_FOUND' || away === 'NOT_FOUND') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenMsg = 'Token must be a valid token';
    const tokenToVerify = token.split(' ')[1] || token;
    const validToken = TokenGenerator.verifyToken(tokenToVerify);
    if (validToken === tokenMsg) return res.status(401).json({ message: validToken });
    req.body.payload = validToken;
    next();
  }
}
