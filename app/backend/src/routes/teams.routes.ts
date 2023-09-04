import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';
// import Validations from '../middlewares/Validations';

const teamController = new TeamController();

const router = Router();

router.post(
  '/',
  // Validations.validateBook,
  (req: Request, res: Response) => teamController.createTeam(req, res),
);

router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

// router.put(
//   '/:id',
//   Validations.validateBook, // aproveitamos a validação já criada para o cadastro
//   (req: Request, res: Response) =>
//     bookController.updateBook(req, res),
// );
// router.delete(
//   '/:id',
//   (req: Request, res: Response) => bookController.deleteBook(req, res),
// );

export default router;
