import { AppDataSource } from '../config/database';
import { Borrow } from '../entities/Borrow';
import { Book } from '../entities/Book';
import { User } from '../entities/User';
import { IsNull, Not } from 'typeorm';

export class BorrowService {
  private borrowRepo = AppDataSource.getRepository(Borrow);

  /**
   * Check if a given book has an active Borrow (i.e. not returned).
   * Using QueryBuilder instead of findOne.
   */
  async findActiveBorrowForBook(bookId: number): Promise<Borrow | null> {
    const qb = this.borrowRepo
      .createQueryBuilder('borrow')
      .leftJoinAndSelect('borrow.book', 'book')
      .leftJoinAndSelect('borrow.user', 'user')
      .where('book.id = :bookId', { bookId })
      .andWhere('borrow.returnedAt IS NULL');

    return qb.getOne();
  }

  /**
   * Check if a given user is currently borrowing a specific book.
   * Using QueryBuilder instead of findOne.
   */
  async findActiveBorrowByUser(userId: number, bookId: number): Promise<Borrow | null> {
    const qb = this.borrowRepo
      .createQueryBuilder('borrow')
      .leftJoinAndSelect('borrow.book', 'book')
      .leftJoinAndSelect('borrow.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('book.id = :bookId', { bookId })
      .andWhere('borrow.returnedAt IS NULL');

    return qb.getOne();
  }

  /**
   * Create a new borrow record (when user borrows a book).
   * This still uses the repository's create/save,
   * because QueryBuilder is more useful for complex inserts/updates.
   */
  async createBorrow(user: User, book: Book): Promise<Borrow> {
    const newBorrow = this.borrowRepo.create({
      user,
      book,
      borrowedAt: new Date(),
    });
    return this.borrowRepo.save(newBorrow);
  }

  /**
   * Mark a borrow as returned (and optionally set score).
   * Also simpler with save, but you could do a QueryBuilder update if desired.
   */
  async returnBorrow(borrow: Borrow, score?: number) {
    borrow.returnedAt = new Date();
    if (score !== undefined) {
      borrow.score = score;
    }

    await this.borrowRepo.save(borrow);
  }

  /**
   * Find all Borrow records for a user (current/past).
   * Using QueryBuilder to fetch with 'book' relation.
   */
  async findAllBorrowsByUser(userId: number): Promise<Borrow[]> {
    const qb = this.borrowRepo
      .createQueryBuilder('borrow')
      .leftJoinAndSelect('borrow.book', 'book')
      .where('borrow.userId = :userId', { userId });

    return qb.getMany();
  }

  /**
   * Find all completed borrows for a book (for score calculations).
   * Using QueryBuilder to filter by returnedAt != NULL.
   */
  async findAllCompletedBorrowsByBook(bookId: number): Promise<Borrow[]> {
    const qb = this.borrowRepo
      .createQueryBuilder('borrow')
      .where('borrow.bookId = :bookId', { bookId })
      .andWhere('borrow.returnedAt IS NOT NULL');

    return qb.getMany();
  }
}
