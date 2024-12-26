import { Router } from 'express';
import { BorrowService } from './services/BorrowService';
import { BookService } from './services/BookService';
import { UserService } from './services/UserService';
import { UserController } from './controllers/UserController';
import { BookController } from './controllers/BookController';

const router = Router();

const bookService = new BookService();
const borrowService = new BorrowService(bookService);
const userService = new UserService(borrowService, bookService);

const bookController = new BookController(bookService);
const userController = new UserController(userService);

// -- Users
router.route('/users').get(userController.listAllUsers);
router.get('/users/:userId', userController.getUserDetail);
router.post('/users/:userId/return/:bookId', userController.returnBook);
router.post('/users/:userId/borrow/:bookId', userController.borrowBook);


// -- Books
router.get('/books', bookController.listAllBooks);
router.get('/books/:bookId', bookController.getBookDetail);
router.get('/books/:bookId/detail-with-borrows', bookController.getBookDetailWithBorrows);

export default router;
