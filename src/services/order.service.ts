import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

interface CreateOrderDto {
  user_id: number;
  cart_id: number;
  shipping_method: string;
  payment_type: string;
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Get cart with items
      const cart = await this.cartRepository.findOne({
        where: { cart_id: orderData.cart_id },
        relations: ['cartItems', 'cartItems.product'],
      });

      if (!cart || !cart.cartItems.length) {
        throw new Error('Cart is empty');
      }

      // Calculate total price
      const total = cart.cartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      );

      // Create order
      const order = this.orderRepository.create({
        user_id: orderData.user_id,
        total_price: total,
        status: 'pending',
      });

      const savedOrder = await queryRunner.manager.save(Order, order);

      // Create order items
      const orderItems = cart.cartItems.map((cartItem) => {
        const orderItem = this.orderItemRepository.create({
          order_id: savedOrder.order_id,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
          price_at_purchase: cartItem.product.price,
        });
        return orderItem;
      });

      await queryRunner.manager.save(OrderItem, orderItems);

      // Update product stock
      for (const cartItem of cart.cartItems) {
        const product = await this.productRepository.findOne({
          where: { product_id: cartItem.product_id },
        });
        if (product.stock_quantity < cartItem.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
        product.stock_quantity -= cartItem.quantity;
        await queryRunner.manager.save(Product, product);
      }

      // Clear cart
      await queryRunner.manager.delete(Cart, cart.cart_id);

      await queryRunner.commitTransaction();

      return this.findOne(savedOrder.order_id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(userId?: number): Promise<Order[]> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .leftJoinAndSelect('order.shipping', 'shipping')
      .leftJoinAndSelect('order.payment', 'payment');

    if (userId) {
      queryBuilder.where('order.user_id = :userId', { userId });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { order_id: id },
      relations: ['orderItems', 'orderItems.product', 'shipping', 'payment'],
    });
  }

  async updateStatus(id: number, status: string): Promise<Order> {
    await this.orderRepository.update(id, { status });
    return this.findOne(id);
  }
}
