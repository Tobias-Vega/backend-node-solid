import express from 'express';
import userRouter from './routes/user.routes';
import { errorHandler } from './utils/error-handler';

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);

  app.use(errorHandler);

  return app;
}