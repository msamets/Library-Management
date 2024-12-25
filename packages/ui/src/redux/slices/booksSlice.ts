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
    {
      "id": 2,
      "name": "secondBookName",
      "author": "secondBookAuthor",
      "publishedYear": 2000,
      "score": "8.00",
      "borrows": [
          {
              "id": 2,
              "borrowedAt": "2024-12-24T19:23:39.000Z",
              "returnedAt": "2024-12-24T19:24:32.000Z"
          },
          {
              "id": 3,
              "borrowedAt": "2024-12-24T19:36:14.000Z",
              "returnedAt": "2024-12-24T19:36:25.000Z"
          },
          {
              "id": 5,
              "borrowedAt": "2024-12-25T19:21:33.000Z",
              "returnedAt": null
          }
      ]
  }

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
