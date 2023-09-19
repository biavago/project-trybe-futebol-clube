import { Request, Router, Response } from 'express';
import LbController from '../controllers/LeaderboardController';

const lbController = new LbController();

const router = Router();

router.get('/', (req: Request, res: Response) => lbController.getAllLb(req, res));
router.get('/home', (req: Request, res: Response) => lbController.getHomeLb(req, res));
router.get('/away', (req: Request, res: Response) => lbController.getAwayLb(req, res));


export default router;
