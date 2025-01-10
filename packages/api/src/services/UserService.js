"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
class UserService {
    constructor(borrowService, bookService) {
        this.borrowService = borrowService;
        this.bookService = bookService;
        this.userRepo = database_1.AppDataSource.getRepository(User_1.User);
    }
    /**
     * List all users
     */
    listAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.find({
                select: ['id', 'name'],
            });
        });
    }
    /**
     * Find a single user by ID (throw if not found)
     */
    findUserByIdOrThrow(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOne({ where: { id: userId } });
            if (!user)
                throw new Error('User not found');
            return user;
        });
    }
    /**
     * Find a single user by ID (throw if not found)
     */
    findUserShortByIdOrThrow(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOne({
                where: { id: userId },
                select: ['id', 'name'],
            });
            if (!user)
                throw new Error('User not found');
            return user;
        });
    }
    /**
     * Get user detail:
     *   - current borrows
     *   - previous borrows
     */
    getUserDetail(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserShortByIdOrThrow(userId);
            const allBorrows = yield this.borrowService.findAllBorrowsByUser(user.id);
            const presentBooks = allBorrows
                .filter((b) => !b.returnedAt)
                .map((b) => ({
                id: b.book.id,
                name: b.book.name,
            }));
            const pastBooks = allBorrows
                .filter((b) => b.returnedAt)
                .map((b) => ({
                id: b.book.id,
                name: b.book.name,
                userScore: b.score,
            }));
            const books = {
                past: pastBooks,
                present: presentBooks,
            };
            return Object.assign(Object.assign({}, user), { books });
        });
    }
    /**
     * Return a borrowed book
     */
    returnBook(userId, bookId, score) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.findUserByIdOrThrow(userId);
            const activeBorrow = yield this.borrowService.findActiveBorrowByUser(userId, bookId);
            if (!activeBorrow) {
                throw new Error('Active borrow record not found for user/book');
            }
            yield this.borrowService.returnBorrow(activeBorrow, score);
        });
    }
    /**
     * Borrow the book to a user
     * - Confirm the book isn't borrowed
     * - Confirm the user exists
     * - Create new Borrow record
     */
    borrowBook(bookId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookService.findBookByIdOrThrow(bookId);
            const activeBorrow = yield this.borrowService.findActiveBorrowForBook(bookId);
            if (activeBorrow) {
                throw new Error('Book is already borrowed');
            }
            const user = yield this.findUserByIdOrThrow(userId);
            yield this.borrowService.createBorrow(user, book);
        });
    }
}
exports.UserService = UserService;
