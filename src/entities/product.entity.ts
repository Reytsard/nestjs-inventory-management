import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  pid: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  isAvailable: boolean;
}
