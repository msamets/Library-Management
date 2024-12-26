import { User } from './User';

export interface Borrow {
    id: number;
    borrowedAt: string; // ISO date string
    returnedAt: string | null; // ISO date string or null
    user?: User;
  }
