import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
// import Validations from '../middlewares/Validations';

const usersController = new UsersController();

const router = Router();

router.post(
  '/login',
  // Validations.validateLogin,
  (req: Request, res: Response) => usersController.login(req, res),
);

router.get(
  '/login/role',
  // Validations.validateToken,
  (req: Request, res: Response) => usersController.role(req, res),
);

export default router;
