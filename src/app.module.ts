import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [CustomerModule, TypeOrmModule.forRoot({
    type: 'postgres',
    username: 'postgres',
    password: 'dostm!@#',
    host: 'localhost',
    port: 5432,
    autoLoadEntities: true,
    synchronize: true,
    database: 'customer-management'
  })],
})
export class AppModule {}
