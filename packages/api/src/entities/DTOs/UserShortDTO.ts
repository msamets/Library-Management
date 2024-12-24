import { Expose } from 'class-transformer';

export class UserShortDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
