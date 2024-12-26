export interface Borrow {
    id: number;
    borrowedAt: string;
    returnedAt: string | null;
  }

export interface BookDetailWithBorrows {
id: number;
name: string;
author: string;
publishedYear?: number;
score: string | number;
borrows: Borrow[];
}


export interface Book {
    id: number;
    name: string;
    author: string;
    publishedYear?: number;
    score: string | number;
  }
