import * as express from 'express';
// import router from './routes';
import teamsRouter from './routes/teams.routes';
import usersRouter from './routes/users.routes';
import matchesRouter from './routes/matches.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/teams', teamsRouter);
    this.app.use('/login', usersRouter);
    this.app.use('/matches', matchesRouter);
    // this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
export const { app } = new App();
