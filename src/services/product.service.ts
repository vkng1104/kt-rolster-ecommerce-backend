import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async findAll(options?: {
    category?: number;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  }): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images');

    if (options?.category) {
      queryBuilder.andWhere('product.category_id = :categoryId', {
        categoryId: options.category,
      });
    }

    if (options?.minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: options.minPrice,
      });
    }

    if (options?.maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: options.maxPrice,
      });
    }

    if (options?.inStock) {
      queryBuilder.andWhere('product.stock_quantity > 0');
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { product_id: id },
      relations: ['category', 'images', 'productSales'],
    });
  }

  async update(id: number, productData: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, productData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    product.stock_quantity += quantity;
    return this.productRepository.save(product);
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .where('product.name ILIKE :query OR product.description ILIKE :query', {
        query: `%${query}%`,
      })
      .getMany();
  }
}
