// import { NextFunction, Request, Response } from 'express';
// import TokenGenerator from '../utils/TokenGenerator';

class Validations {
  // static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
  //   const { email, password } = req.body;
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (email === "" || password === "") {
  //     return res.status(400).json({ message: "All fields must be filled" });
  //   }
  //   if (!emailRegex.test(email) || password.length < 6) {
  //     return res.status(401).json({ message: 'Invalid email or password' });
  //   }
  //   next();

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
}

export default Validations;
