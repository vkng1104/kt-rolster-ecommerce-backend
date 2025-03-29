import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Auth
import { AuthModule } from './auth/auth.module';
import {
  UserModule,
  ProductModule,
  CategoryModule,
  OrderModule,
  CartModule,
  CollectionModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    CartModule,
    CollectionModule,
  ],
})
export class AppModule {}
