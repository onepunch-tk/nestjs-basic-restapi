import { CustomerLevel } from 'src/common/define-enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 16,
  })
  name: string;

  @Column()
  age: number;

  @Column({
    enum: CustomerLevel,
  })
  level: CustomerLevel;
}
