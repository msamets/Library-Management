import { UserService } from './../services/UserService';
import { Request, Response } from 'express';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;

    this.listAllUsers = this.listAllUsers.bind(this);
    this.getUserDetail = this.getUserDetail.bind(this);
    this.returnBook = this.returnBook.bind(this);
    this.borrowBook = this.borrowBook.bind(this);
  }

  async listAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.listAllUsers();
      res.status(200).json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  async getUserDetail(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const detail = await this.userService.getUserDetail(userId);
      res.status(200).json(detail);
    } catch (err: any) {
      if (err.message === 'User not found') {
        res.status(404).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: err.message });
    }
  };

  async returnBook(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const bookId = Number(req.params.bookId);
      const { score } = req.body;
      await this.userService.returnBook(userId, bookId, score);

      res.status(200).json({ message: 'Book returned successfully.' });
    } catch (err: any) {
      if (err.message.includes('not found')) {
        res.status(404).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: err.message });
    }
  };

  async borrowBook(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const bookId = Number(req.params.bookId);

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }
      await this.userService.borrowBook(bookId, userId);
      res.status(201).json({ message: 'Book borrowed successfully.' });
    } catch (err: any) {
      if (
        err.message === 'Book is already borrowed' ||
        err.message === 'User not found' ||
        err.message === 'Book not found'
      ) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: err.message });
    }
  };
}
