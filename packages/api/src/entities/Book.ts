import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: 'int', nullable: true })
  publishedYear?: number;

  // If storing average rating in DB (vs calculating on the fly)
  @Column({ type: 'float', nullable: true })
  averageRating?: number;

  // Relationship to Borrow
  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];
}
