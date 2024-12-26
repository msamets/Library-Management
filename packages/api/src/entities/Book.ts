import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './Borrow';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column({ type: 'int', nullable: true })
  publishedYear?: number;

  @Column({ type: 'float', nullable: true })
  averageScore?: number;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];
}
