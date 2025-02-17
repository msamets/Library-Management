import { Request, Response } from 'express';
import { BookService } from '../services/BookService';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { GetBookDetailRequestDTO } from './../entities/DTOs/GetBookDetailRequestDTO';
import { BookDetailWithBorrowsResponseDTO } from './../entities/DTOs/BookDetailWithBorrowsResponseDTO';

export class BookController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;

    this.listAllBooks = this.listAllBooks.bind(this);
    this.getBookDetail = this.getBookDetail.bind(this);
    this.getBookDetailWithBorrows = this.getBookDetailWithBorrows.bind(this);
  }

  async listAllBooks(req: Request, res: Response) {
    try {
      const books = await this.bookService.listAllBooks();
      res.status(200).json(books);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  async getBookDetail(req: Request, res: Response) {
    try {
      const dto = plainToInstance(GetBookDetailRequestDTO, { bookId: Number(req.params.bookId) });
      const errors = await validate(dto);

      if (errors.length > 0) {
        const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
        res.status(400).json({ errors: messages });
        return;
      }

      const detail = await this.bookService.getBookDetail(dto.bookId);
      res.status(200).json(detail);
    } catch (err: any) {
      if (err.message === 'Book not found') {
        res.status(404).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: err.message });
    }
  };

  async getBookDetailWithBorrows(req: Request, res: Response) {
    try {
      const dto = plainToInstance(GetBookDetailRequestDTO, { bookId: Number(req.params.bookId) });
      const errors = await validate(dto);

      if (errors.length > 0) {
        const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
        res.status(400).json({ errors: messages });
        return;
      }

      const detailWithBorrows = await this.bookService.getBookDetailWithBorrows(dto.bookId);

      const responseDTO = plainToInstance(BookDetailWithBorrowsResponseDTO, detailWithBorrows);
      const validationErrors = await validate(responseDTO);

      if (validationErrors.length > 0) {
        const messages = validationErrors.map((err) => Object.values(err.constraints || {}).join(', '));
        res.status(500).json({ errors: messages });
        return;
      }

      res.status(200).json(responseDTO);
    } catch (err: any) {
      if (err.message === 'Book not found') {
        res.status(404).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: err.message });
    }
  };
}
