import { IsInt, Min } from 'class-validator';

export class GetUserDetailRequestDTO {
  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be a positive number' })
  userId: number;
}
