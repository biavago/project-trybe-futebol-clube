import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
// import Validations from '../middlewares/Validations';

const matchesController = new MatchesController();

const router = Router();

router.post('/matches', (req: Request, res: Response) => matchesController.create(req, res));
router.get('/matches', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch('/matches/:id', (req: Request, res: Response) => matchesController.update(req, res));
router.patch(
  '/matches/:id/finish',
  (req: Request, res: Response) => matchesController.update(req, res),
);

export default router;