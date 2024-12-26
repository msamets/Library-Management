import { IsInt, Min } from 'class-validator';

export class GetBookDetailRequestDTO {
  @IsInt({ message: 'Book ID must be an integer' })
  @Min(1, { message: 'Book ID must be a positive number' })
  bookId: number;
}
