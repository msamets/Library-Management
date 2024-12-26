import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { Borrow } from '../entities/Borrow';
import { BorrowService } from './BorrowService';
import { BookService } from './BookService';
import { UserShortDTO } from './../entities/DTOs/UserShortDTO';

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  constructor(
    private borrowService: BorrowService,
    private bookService: BookService,
  ) {}

  /**
   * List all users
   */
  async listAllUsers(): Promise<UserShortDTO[]> {
    return this.userRepo.find({
      select: ['id', 'name'],
    });
  }

  /**
   * Find a single user by ID (throw if not found)
   */
  async findUserByIdOrThrow(userId: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    return user;
  }

  /**
   * Find a single user by ID (throw if not found)
   */
  async findUserShortByIdOrThrow(userId: number): Promise<UserShortDTO> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: ['id', 'name'],
    });

    if (!user) throw new Error('User not found');
    return user;
  }

  /**
   * Get user detail:
   *   - current borrows
   *   - previous borrows
   */
  async getUserDetail(userId: number) {
    const user = await this.findUserShortByIdOrThrow(userId);

    const allBorrows = await this.borrowService.findAllBorrowsByUser(user.id);

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
    }

    return { ...user, books };
  }

  /**
   * Return a borrowed book
   */
  async returnBook(userId: number, bookId: number, score?: number) {
    await this.findUserByIdOrThrow(userId);

    const activeBorrow = await this.borrowService.findActiveBorrowByUser(userId, bookId);
    if (!activeBorrow) {
      throw new Error('Active borrow record not found for user/book');
    }

    await this.borrowService.returnBorrow(activeBorrow, score);
  }

  /**
   * Borrow the book to a user
   * - Confirm the book isn't borrowed
   * - Confirm the user exists
   * - Create new Borrow record
   */
  async borrowBook(bookId: number, userId: number) {
    const book = await this.bookService.findBookByIdOrThrow(bookId);

    const activeBorrow = await this.borrowService.findActiveBorrowForBook(bookId);
    if (activeBorrow) {
      throw new Error('Book is already borrowed');
    }

    const user = await this.findUserByIdOrThrow(userId);

    await this.borrowService.createBorrow(user, book);
  }
}
