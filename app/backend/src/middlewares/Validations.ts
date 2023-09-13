import { NextFunction, Request, Response } from 'express';
// import TokenGenerator from '../utils/TokenGenerator';

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || password === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateMatch(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    if (!homeTeamId || !awayTeamId) {
      return res.status(404).json(
        { message: 'There is no team with such id!' },
      );
    }
    next();
  }

  // static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
  //   const token = req.headers.authorization;
  //   if (!token) {
  //     return res.status(401).json({ message: 'Token not found' });
  //   }

  //   const bearerToken = token.split(' ')[1] || token;
  //   const validToken = TokenGenerator.verifyToken(bearerToken);
  //   if (validToken === 'Token must be a valid token') {
  //     return res.status(401).json({ message: validToken });
  //   }

  //   req.body.payload = validToken;
  //   next();
  // }
}
