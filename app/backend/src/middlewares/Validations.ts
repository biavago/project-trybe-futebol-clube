import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';
import TokenGenerator from '../utils/TokenGenerator';

export default class Validations {
  static async validateMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;
    const teamsService = new TeamService();
    const home = (await teamsService.getTeamById(homeTeamId)).status;
    const away = (await teamsService.getTeamById(awayTeamId)).status;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    if (!home || !away) return res.status(404).json({ message: 'There is no team with such id!' });
    next();
  }

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    console.log('req.body', req.body);
    console.log('email', email);
    console.log('password', password);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (email === '' || password === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    console.log('req.headers', req.headers);
    console.log('req.body', req.body);
    const token = req.headers.authorization;
    console.log('token', token);
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const tokenMsg = 'Token must be a valid token';
    const tokenToVerify = token.split(' ')[1] || token;
    const validToken = TokenGenerator.verifyToken(tokenToVerify);
    console.log('tokenToVerify', tokenToVerify)
    console.log('validToken', validToken)
    // ESSA VERIFICACAO FALHAVA PARA UM TOKEN INVALIDO!!
    // MUDADO O RETORNO DA FUNCAO verifyToken EM CASO DE ERRO
    if (validToken === tokenMsg) return res.status(401).json({ message: validToken });
    req.body.payload = validToken;
    next();
  }
}
