import { User } from './User';
// src/types/borrow.ts

export interface Borrow {
    id: number;
    borrowedAt: string; // ISO date string
    returnedAt: string | null; // ISO date string or null
    // Optionally, include user details if necessary
    user?: User;
  }
