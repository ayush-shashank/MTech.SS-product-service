import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column({ default: 0 })
  quantity: number;
  @Column()
  description: string;
  @Column()
  image: string;
}
