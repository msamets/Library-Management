import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: number;
  name: string;
  score: string;
  lentTo?: number;
}

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [
    { id: 4, name: '1984', score: '4.50' },
    { id: 5, name: 'Brave New World', score: '4.75' },
    { id: 3, name: 'Dune', score: -1 },
    { id: 2, name: 'I, Robot', score: '5.33' },
    { id: 1, name: "The Hitchhiker's Guide to the Galaxy", score: -1 },
  ],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    lendBook: (
      state,
      action: PayloadAction<{ bookId: number; userId: number }>
    ) => {
      const book = state.books.find((b) => b.id === action.payload.bookId);
      if (book) {
        book.lentTo = action.payload.userId;
      }
    },
    // TODO: add returnBook slice
    returnBook: (state, action: PayloadAction<{ bookId: number }>) => {
      const book = state.books.find((b) => b.id === action.payload.bookId);
      if (book) {
        delete book.lentTo;
      }
    },
  },
});

export const { lendBook, returnBook } = booksSlice.actions;
export default booksSlice.reducer;
