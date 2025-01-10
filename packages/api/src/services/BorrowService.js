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
exports.BorrowService = void 0;
const database_1 = require("../config/database");
const Borrow_1 = require("../entities/Borrow");
class BorrowService {
    constructor(bookService) {
        this.bookService = bookService;
        this.borrowRepo = database_1.AppDataSource.getRepository(Borrow_1.Borrow);
    }
    /**
     * Check if a given book has an active Borrow (i.e. not returned).
     * Using QueryBuilder instead of findOne.
     */
    findActiveBorrowForBook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = this.borrowRepo
                .createQueryBuilder('borrow')
                .leftJoinAndSelect('borrow.book', 'book')
                .leftJoinAndSelect('borrow.user', 'user')
                .where('book.id = :bookId', { bookId })
                .andWhere('borrow.returnedAt IS NULL');
            return qb.getOne();
        });
    }
    /**
     * Check if a given user is currently borrowing a specific book.
     * Using QueryBuilder instead of findOne.
     */
    findActiveBorrowByUser(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = this.borrowRepo
                .createQueryBuilder('borrow')
                .leftJoinAndSelect('borrow.book', 'book')
                .leftJoinAndSelect('borrow.user', 'user')
                .where('user.id = :userId', { userId })
                .andWhere('book.id = :bookId', { bookId })
                .andWhere('borrow.returnedAt IS NULL');
            return qb.getOne();
        });
    }
    /**
     * Create a new borrow record (when user borrows a book).
     * This still uses the repository's create/save,
     * because QueryBuilder is more useful for complex inserts/updates.
     */
    createBorrow(user, book) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBorrow = this.borrowRepo.create({
                user,
                book,
                borrowedAt: new Date(),
            });
            return this.borrowRepo.save(newBorrow);
        });
    }
    /**
     * Mark a borrow as returned (and optionally set score).
     * Also simpler with save, but you could do a QueryBuilder update if desired.
     */
    returnBorrow(borrow, score) {
        return __awaiter(this, void 0, void 0, function* () {
            borrow.returnedAt = new Date();
            if (score !== undefined) {
                borrow.score = score;
            }
            if (score) {
                const book = yield this.bookService.findBookByIdOrThrow(borrow.book.id);
                if (!book.averageScore) {
                    book.averageScore = score;
                }
                else {
                    const borrows = yield this.borrowRepo.find({
                        where: { book: { id: book.id } },
                        select: ['score'],
                    });
                    const allScores = borrows
                        .filter((b) => b.score !== null && b.score !== undefined)
                        .map((b) => b.score);
                    allScores.push(score);
                    const totalScore = allScores.reduce((sum, curr) => sum + curr, 0);
                    book.averageScore = totalScore / allScores.length;
                }
                yield this.bookService.updateBook(book);
            }
            yield this.borrowRepo.save(borrow);
        });
    }
    /**
     * Find all Borrow records for a user (current/past).
     * Using QueryBuilder to fetch with 'book' relation.
     */
    findAllBorrowsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = this.borrowRepo
                .createQueryBuilder('borrow')
                .leftJoinAndSelect('borrow.book', 'book')
                .where('borrow.userId = :userId', { userId });
            return qb.getMany();
        });
    }
    /**
     * Find all completed borrows for a book (for score calculations).
     * Using QueryBuilder to filter by returnedAt != NULL.
     */
    findAllCompletedBorrowsByBook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const qb = this.borrowRepo
                .createQueryBuilder('borrow')
                .where('borrow.bookId = :bookId', { bookId })
                .andWhere('borrow.returnedAt IS NOT NULL');
            return qb.getMany();
        });
    }
}
exports.BorrowService = BorrowService;
