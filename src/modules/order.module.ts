import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderService } from '../services/order.service';
import { OrderController } from '../controllers/order.controller';
import { CartModule } from './cart.module';
import { OrderItem } from 'src/entities/order-item.entity';
import { ProductModule } from './product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    CartModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
