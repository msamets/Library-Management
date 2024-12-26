// src/services/bookService.ts

import api from './api';
import { Book, BookDetailWithBorrows } from '../types/book';
import { AxiosResponse } from 'axios';

const bookService = {
  /**
   * Fetch all books
   */
  listAllBooks: async (): Promise<Book[]> => {
    const response: AxiosResponse<Book[]> = await api.get('/books');
    return response.data;
  },

  /**
   * Fetch a single book's basic details
   */
  getBookDetail: async (bookId: number): Promise<Book> => {
    const response: AxiosResponse<Book> = await api.get(`/books/${bookId}`);
    return response.data;
  },

  /**
   * Fetch a single book's details along with its borrows
   */
  getBookDetailWithBorrows: async (bookId: number): Promise<BookDetailWithBorrows> => {
    const response: AxiosResponse<BookDetailWithBorrows> = await api.get(`/books/${bookId}/detail-with-borrows`);
    return response.data;
  },
};

export default bookService;
