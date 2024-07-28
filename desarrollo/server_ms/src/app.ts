import * as express from 'express';
import * as cors from 'cors';

import routes from './routes';
import { DatabaseService } from './services/database/database.service';

async function start() {
  const databaseService = DatabaseService.getInstance();
  await databaseService.getSequelize().sync({
    alter: false,
    force: false
  });

  const app = express();
  const port = 3000;

  app.use(express.json());

  app.use(cors());

  app.use('/', routes);

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send();
  });

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).send();
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

start();