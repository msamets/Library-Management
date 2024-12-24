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

    // Relationship to User
    @ManyToOne(() => User, (user) => user.borrows, {
      onDelete: 'CASCADE',
    })
    user: User;

    // Relationship to Book
    @ManyToOne(() => Book, (book) => book.borrows, {
      onDelete: 'CASCADE',
    })
    book: Book;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    borrowedOn: Date;

    @Column({ type: 'timestamp', nullable: true })
    returnedOn?: Date;

    // rating from the user for this borrowed item
    @Column({ type: 'float', nullable: true })
    rating?: number;
  }
