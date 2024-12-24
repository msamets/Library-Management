import { AppDataSource } from '../config/database';
import { Book } from '../entities/Book';
import { BorrowService } from './BorrowService';

export class BookService {
  private bookRepo = AppDataSource.getRepository(Book);

  constructor(
    private borrowService: BorrowService,  // for borrow logic
  ) {}

  async listAllBooks(): Promise<Book[]> {
    return this.bookRepo.find();
  }

  /**
   * Find a book by ID or throw
   */
  async findBookByIdOrThrow(bookId: number): Promise<Book> {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) throw new Error('Book not found');
    return book;
  }

  /**
   * Return a single book's details, including:
   *   - Current active borrower
   *   - Average score from completed borrows
   */
  async getBookDetail(bookId: number) {
    const book = await this.findBookByIdOrThrow(bookId);

    // Check current active borrow
    const activeBorrow = await this.borrowService.findActiveBorrowForBook(book.id);

    // Get all completed borrows for score calculations
    const completedBorrows = await this.borrowService.findAllCompletedBorrowsByBook(book.id);
    let averageScore: number | null = null;
    if (completedBorrows.length) {
      const sum = completedBorrows.reduce((acc, b) => acc + (b.score || 0), 0);
      const count = completedBorrows.filter(b => b.score != null).length;
      averageScore = count ? sum / count : null;
    }

    return {
      book,
      activeBorrow,
      averageScore,
    };
  }
}
