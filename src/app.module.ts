import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    CustomerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'xorudA0805!',
      database: 'customer-management',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
})
export class AppModule {}
