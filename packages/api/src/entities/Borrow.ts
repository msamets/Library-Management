import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { User } from './User';
  import { Book } from './Book';

  @Entity('borrows')
  export class Borrow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.borrows, {
      onDelete: 'CASCADE',
    })
    user: User;

    @ManyToOne(() => Book, (book) => book.borrows, {
      onDelete: 'CASCADE',
    })
    book: Book;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    borrowedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    returnedAt?: Date;

    @Column({ type: 'float', nullable: true })
    score?: number;
  }
