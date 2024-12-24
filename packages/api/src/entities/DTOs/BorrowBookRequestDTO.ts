import { IsInt, Min } from 'class-validator';

export class BorrowBookRequestDTO {
  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be a positive number' })
  userId: number;

  @IsInt({ message: 'Book ID must be an integer' })
  @Min(1, { message: 'Book ID must be a positive number' })
  bookId: number;
}
