import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';

export default class TokenGenerator {
  private static secret = process.env.JWT_SECRET || 'jwt_secret';

  private static jwtConfig: SignOptions = {
    algorithm: 'HS256', expiresIn: '1d',
  };

  static generateToken(payload: JwtPayload): string {
    return sign(payload, TokenGenerator.secret, TokenGenerator.jwtConfig);
  }

  static verifyToken(token: string): JwtPayload | string {
    try {
      return verify(token, TokenGenerator.secret) as JwtPayload;
    } catch (error) {
      return { message: 'Invalid token' };
    }
  }
}
