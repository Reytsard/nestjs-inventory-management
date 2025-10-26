import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class InventoryHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @OneToOne(() => User, (user) => user.uuid)
  userId: number;

  @Column()
  dateTime: Date;
}
