import { UserService } from './../services/UserService';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { GetUserDetailRequestDTO } from './../entities/DTOs/GetUserDetailRequestDTO';
import { BorrowBookRequestDTO } from './../entities/DTOs/BorrowBookRequestDTO';
import { ReturnBookRequestDTO } from './../entities/DTOs/ReturnBookRequestDTO';

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
      const dto = plainToInstance(GetUserDetailRequestDTO, { userId: Number(req.params.userId) });
      const errors = await validate(dto);

      if (errors.length > 0) {
        const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
        res.status(400).json({ errors: messages });
        return;
      }

      const detail = await this.userService.getUserDetail(dto.userId);
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
      const dto = plainToInstance(ReturnBookRequestDTO, {
        userId: Number(req.params.userId),
        bookId: Number(req.params.bookId),
        score: req.body.score,
      });

      const errors = await validate(dto);

      if (errors.length > 0) {
        const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
        res.status(400).json({ errors: messages });
        return;
      }

      await this.userService.returnBook(dto.userId, dto.bookId, dto.score);

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
      const dto = plainToInstance(BorrowBookRequestDTO, {
        userId: Number(req.params.userId),
        bookId: Number(req.params.bookId),
      });

      const errors = await validate(dto);

      if (errors.length > 0) {
        const messages = errors.map((err) => Object.values(err.constraints || {}).join(', '));
        res.status(400).json({ errors: messages });
        return;
      }

      await this.userService.borrowBook(dto.bookId, dto.userId);
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
