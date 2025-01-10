"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BorrowService_1 = require("./services/BorrowService");
const BookService_1 = require("./services/BookService");
const UserService_1 = require("./services/UserService");
const UserController_1 = require("./controllers/UserController");
const BookController_1 = require("./controllers/BookController");
const router = (0, express_1.Router)();
const bookService = new BookService_1.BookService();
const borrowService = new BorrowService_1.BorrowService(bookService);
const userService = new UserService_1.UserService(borrowService, bookService);
const bookController = new BookController_1.BookController(bookService);
const userController = new UserController_1.UserController(userService);
// -- Users
router.route('/users').get(userController.listAllUsers);
router.get('/users/:userId', userController.getUserDetail);
router.post('/users/:userId/return/:bookId', userController.returnBook);
router.post('/users/:userId/borrow/:bookId', userController.borrowBook);
// -- Books
router.get('/books', bookController.listAllBooks);
router.get('/books/:bookId', bookController.getBookDetail);
router.get('/books/:bookId/detail-with-borrows', bookController.getBookDetailWithBorrows);
exports.default = router;
