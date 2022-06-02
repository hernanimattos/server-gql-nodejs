import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { routes } from './router';
import cors from 'cors';

import { ErrorHandler } from './modules/error/ErrorHandler';

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.get('/', (req, res) => {
  res.send('deu cero');
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorHandler) {
    return res.status(400).json({
      error: err,
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
