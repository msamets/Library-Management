// src/services/userService.ts

import api from './api';
import { User } from '../types/user';
import { AxiosResponse } from 'axios';

const userService = {
  /**
   * Fetch all users
   */
  listAllUsers: async (): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await api.get('/users');
    return response.data;
  },

  /**
   * Fetch a single user's details
   */
  getUserDetail: async (userId: number): Promise<User> => {
    const response: AxiosResponse<User> = await api.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Borrow a book
   */
  borrowBook: async (userId: number, bookId: number): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await api.post(`/users/${userId}/borrow/${bookId}`);
    return response.data;
  },

  /**
   * Return a book
   */
  returnBook: async (userId: number, bookId: number, score?: number): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await api.post(`/users/${userId}/return/${bookId}`, { score });
    return response.data;
  },
};

export default userService;
