import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';

@Entity()
export class BorrowRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, item => item.borrowRequests, { onDelete: 'CASCADE' })
  item: Item;

  @ManyToOne(() => User, user => user.borrowRequests, { onDelete: 'CASCADE' })
  borrower: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  requestDate: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'declined' | 'returned';

  @Column({ type: 'date', nullable: true })
  returnDueDate: string;
}
