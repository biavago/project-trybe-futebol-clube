import { Request, Router, Response } from 'express';
import LbController from '../controllers/LeaderboardController';

const lbController = new LbController();

const router = Router();

router.get('/home', (req: Request, res: Response) => lbController.getLeaderboardHome(req, res));
router.get('/away', (req: Request, res: Response) => lbController.getLeaderboardAway(req, res));
// router.get('/', (req: Request, res: Response) => lbController.getLeaderboard(req, res));

export default router;
