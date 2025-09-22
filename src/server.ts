import "reflect-metadata";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createApp } from './app';

dotenv.config();

const MONGO = process.env.MONGO_URL!;

async function start() {
  await mongoose.connect(MONGO);
  const app = createApp();
  const port = process.env.PORT;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});