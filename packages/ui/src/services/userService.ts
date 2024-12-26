import api from './api';
import { User } from '../types/user';
import { AxiosResponse } from 'axios';

const userService = {
  listAllUsers: async (): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await api.get('/users');
    return response.data;
  },

  getUserDetail: async (userId: number): Promise<User> => {
    const response: AxiosResponse<User> = await api.get(`/users/${userId}`);
    return response.data;
  },


  borrowBook: async (userId: number, bookId: number): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await api.post(`/users/${userId}/borrow/${bookId}`);
    return response.data;
  },

  returnBook: async (userId: number, bookId: number, score?: number): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await api.post(`/users/${userId}/return/${bookId}`, { score });
    return response.data;
  },
};

export default userService;
