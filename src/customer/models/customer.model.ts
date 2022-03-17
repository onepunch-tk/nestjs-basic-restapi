import { CustomerLevel } from 'src/common/define-enum';

export class Customer {
  id: string;
  name: string;
  age: number;
  email: string;
  level: CustomerLevel;
}
