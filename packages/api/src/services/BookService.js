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
exports.BookService = void 0;
const database_1 = require("../config/database");
const Book_1 = require("../entities/Book");
class BookService {
    constructor() {
        this.bookRepo = database_1.AppDataSource.getRepository(Book_1.Book);
    }
    listAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepo.find({
                select: ['id', 'name'],
            });
        });
    }
    /**
     * Find a book by ID or throw
     */
    findBookByIdOrThrow(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookRepo.findOne({ where: { id: bookId } });
            if (!book)
                throw new Error('Book not found');
            return book;
        });
    }
    /**
     * Return a single book's details
     */
    getBookDetail(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.findBookByIdOrThrow(bookId);
            return {
                id: book.id,
                name: book.name,
                score: book.averageScore ? book.averageScore.toFixed(2) : -1,
            };
        });
    }
    /**
     * Return a single book detail's with borrows
     */
    getBookDetailWithBorrows(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookRepo
                .createQueryBuilder('book')
                .leftJoinAndSelect('book.borrows', 'borrow')
                .leftJoinAndSelect('borrow.user', 'user')
                .where('book.id = :id', { id: bookId })
                .getOne();
            if (!book)
                throw new Error('Book not found');
            return {
                id: book.id,
                name: book.name,
                author: book.author,
                publishedYear: book.publishedYear,
                score: book.averageScore ? book.averageScore.toFixed(2) : -1,
                borrows: book.borrows.map((borrow) => ({
                    id: borrow.id,
                    borrowedAt: borrow.borrowedAt,
                    returnedAt: borrow.returnedAt,
                    user: {
                        id: borrow.user.id,
                        name: borrow.user.name,
                    },
                })),
            };
        });
    }
    /**
     * Update book
     */
    updateBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepo.save(book);
        });
    }
}
exports.BookService = BookService;
