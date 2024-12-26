import { IsInt, Min, IsOptional, IsNumber } from 'class-validator';

export class ReturnBookRequestDTO {
  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be a positive number' })
  userId: number;

  @IsInt({ message: 'Book ID must be an integer' })
  @Min(1, { message: 'Book ID must be a positive number' })
  bookId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Score must be a number' })
  score?: number;
}
