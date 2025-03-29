import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { ProductController } from '../controllers/product.controller';
import { ProductCollection } from '../entities/product-collection.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCollection])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
