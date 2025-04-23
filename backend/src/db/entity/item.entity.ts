import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { BorrowRequest } from './borrow-request.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  condition: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'borrowed' | 'returned';

  @ManyToOne(() => User, user => user.items, { onDelete: 'CASCADE' })
  lender: User;

  @OneToMany(() => BorrowRequest, req => req.item)
  borrowRequests: BorrowRequest[];

  @Column({ type: 'json', nullable: true })
  location: {
    lat: number;
    lng: number;
  };

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
