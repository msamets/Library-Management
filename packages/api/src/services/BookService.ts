import { AppDataSource } from '../config/database';
import { Book } from '../entities/Book';

export class BookService {
  private bookRepo = AppDataSource.getRepository(Book);

  async listAllBooks(): Promise<Partial<Book[]>> {
    return this.bookRepo.find({
      select: ['id', 'name'],
    });
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
   * Return a single book's details
   */
  async getBookDetail(bookId: number) {
    const book = await this.findBookByIdOrThrow(bookId);

    return {
      id: book.id,
      name: book.name,
      score: book.averageScore ? book.averageScore.toFixed(2) : -1,
    };
  }

  async updateBook(book: Book): Promise<Book> {
    return this.bookRepo.save(book);
  }
}
