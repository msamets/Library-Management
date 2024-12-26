import { Borrow } from './../Borrow';
import { IsNumber, IsString, IsOptional, ValidateNested } from 'class-validator';

export class BookDetailWithBorrowsResponseDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  score: string | number;

  @IsString()
  author: string;

  @IsNumber()
  publishedYear?: number;

  @ValidateNested({ each: true })
  borrows: Borrow[];
}
