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
router.route('/users').get(userController.listAllUsers);              // Grid of users
router.get('/users/:userId', userController.getUserDetail);     // Detail page (borrowed/previously borrowed)
router.post('/users/:userId/return/:bookId', userController.returnBook); // Return a book
router.post('/users/:userId/borrow/:bookId', userController.borrowBook);     // Borrow book to user


// -- Books
router.get('/books', bookController.listAllBooks);              // Grid of available books
router.get('/books/:bookId', bookController.getBookDetail);     // Detail page (book info, current owner, score)

export default router;
