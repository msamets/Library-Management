import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/database';
import { BorrowService } from './services/BorrowService';
import { UserService } from './services/UserService';
import { BookService } from './services/BookService';
import { UserController } from './controllers/UserController';
import { BookController } from './controllers/BookController';
import router from './routes';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
  console.log('Database is ready.');

  const app = express();
  app.use(express.json());
  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => console.error(err));
