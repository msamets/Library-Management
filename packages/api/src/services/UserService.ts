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

    // all borrows via BorrowService
    const allBorrows = await this.borrowService.findAllBorrowsByUser(user.id);

    const presentBooks = allBorrows
    .filter((b) => !b.returnedAt)
    .map((b) => ({
      name: b.book.name,
    }));

    const pastBooks = allBorrows
    .filter((b) => b.returnedAt)
    .map((b) => ({
      name: b.book.name,
      userScore: b.score,
    }));

    const books = {
      past: pastBooks,
      present: presentBooks,
    }

    return { user, books };
  }

  /**
   * Return a borrowed book
   */
  async returnBook(userId: number, bookId: number, score?: number) {
    // Ensure user exists
    await this.findUserByIdOrThrow(userId);

    // Check active borrow
    const activeBorrow = await this.borrowService.findActiveBorrowByUser(userId, bookId);
    if (!activeBorrow) {
      throw new Error('Active borrow record not found for user/book');
    }

    // Mark as returned
    await this.borrowService.returnBorrow(activeBorrow, score);
  }

  /**
   * Borrow the book to a user
   * - Confirm the book isn't borrowed
   * - Confirm the user exists
   * - Create new Borrow record
   */
  async borrowBook(bookId: number, userId: number) {
    // 1. Find the book (throw if not found)
    const book = await this.bookService.findBookByIdOrThrow(bookId);

    // 2. Check if it's already borrowed
    const activeBorrow = await this.borrowService.findActiveBorrowForBook(bookId);
    if (activeBorrow) {
      throw new Error('Book is already borrowed');
    }

    // 3. Ensure user is valid
    const user = await this.findUserByIdOrThrow(userId);

    // 4. Create Borrow
    await this.borrowService.createBorrow(user, book);
  }
}
