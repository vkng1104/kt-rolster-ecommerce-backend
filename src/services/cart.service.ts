import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { ProductService } from './product.service';
import { AddToCartDto } from 'src/dtos/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly productService: ProductService,
  ) {}

  async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user_id: userId },
      relations: ['cartItems', 'cartItems.product'],
    });

    if (!cart) {
      cart = this.cartRepository.create({ user_id: userId });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addToCart(addToCartDto: AddToCartDto): Promise<Cart> {
    const { user_id, product_id, quantity } = addToCartDto;

    // Check product availability
    const product = await this.productService.findOne(product_id);

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock_quantity < quantity) {
      throw new Error('Insufficient stock');
    }

    // Get or create cart
    const cart = await this.getOrCreateCart(user_id);

    // Check if product already in cart
    let cartItem = await this.cartItemRepository.findOne({
      where: { cart_id: cart.cart_id, product_id },
    });

    if (cartItem) {
      // Update quantity
      cartItem.quantity += quantity;
      await this.cartItemRepository.save(cartItem);
    } else {
      // Create new cart item
      cartItem = this.cartItemRepository.create({
        cart_id: cart.cart_id,
        product_id,
        quantity,
      });
      await this.cartItemRepository.save(cartItem);
    }

    return this.findOne(cart.cart_id);
  }

  async findOne(cartId: string): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { cart_id: cartId },
      relations: ['cartItems', 'cartItems.product'],
    });
  }

  async updateQuantity(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { cart_id: cartId, product_id: productId },
    });

    if (!cartItem) {
      throw new Error('Product not found in cart');
    }

    if (quantity <= 0) {
      await this.cartItemRepository.delete(cartItem);
    } else {
      cartItem.quantity = quantity;
      await this.cartItemRepository.save(cartItem);
    }

    return this.findOne(cartId);
  }

  async removeFromCart(cartId: string, productId: string): Promise<Cart> {
    await this.cartItemRepository.delete({
      cart_id: cartId,
      product_id: productId,
    });
    return this.findOne(cartId);
  }

  async clearCart(cartId: string): Promise<void> {
    await this.cartItemRepository.delete({ cart_id: cartId });
  }
}
