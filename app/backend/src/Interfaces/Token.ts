import { JwtPayload } from 'jsonwebtoken';

export default interface IToken {
  generateToken(payload: { email: string }): string;
  verifyToken(token: string): JwtPayload | string;
}
