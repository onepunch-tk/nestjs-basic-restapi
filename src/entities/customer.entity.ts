import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerLevel } from 'src/common/define-enum';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  email: string;
  @Column({
    enum: CustomerLevel
  })
  level: CustomerLevel;
}
