import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { AddToCartDto, UpdateCartItemDto } from '../dtos/cart.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCart(@Request() req) {
    return this.cartService.getOrCreateCart(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('items')
  async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, addToCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('items/:productId')
  async updateCartItem(
    @Request() req,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const cart = await this.cartService.getOrCreateCart(req.user.id);
    return this.cartService.updateQuantity(
      cart.cart_id,
      updateCartItemDto.product_id,
      updateCartItemDto.quantity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('items/:productId')
  async removeFromCart(@Request() req, @Param('productId') productId: string) {
    const cart = await this.cartService.getOrCreateCart(req.user.id);
    return this.cartService.removeFromCart(cart.cart_id, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async clearCart(@Request() req) {
    const cart = await this.cartService.getOrCreateCart(req.user.id);
    return this.cartService.clearCart(cart.cart_id);
  }
}
