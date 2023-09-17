import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/Validations';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => usersController.login(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  // (req: Request, res: Response) => usersController.role(req, res),
  (req: Request, res: Response) => {
    console.log(req);
    return usersController.role(req, res);
  }
);

export default router;
