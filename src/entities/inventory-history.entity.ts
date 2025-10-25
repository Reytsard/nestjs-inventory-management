import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class InventoryHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.uuid)
  userId: number;

  @Column({ default: new Date() })
  dateTime: Date;
}
