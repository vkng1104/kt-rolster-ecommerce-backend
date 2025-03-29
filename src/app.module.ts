import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Payment } from './entities/payment.entity';
import { Shipping } from './entities/shipping.entity';
import { Favorite } from './entities/favorite.entity';
import { Sale } from './entities/sale.entity';
import { ProductSale } from './entities/product-sale.entity';
import { ProductImage } from './entities/product-image.entity';
import { UserProvider } from './entities/user-provider.entity';
import { OAuthLogin } from './entities/oauth-login.entity';

// Services
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';

// Controllers
import { UserController } from './controllers/user.controller';
import { ProductController } from './controllers/product.controller';
import { CategoryController } from './controllers/category.controller';
import { CartController } from './controllers/cart.controller';
import { OrderController } from './controllers/order.controller';

// Auth
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          User,
          Product,
          Category,
          Cart,
          CartItem,
          Order,
          OrderItem,
          Payment,
          Shipping,
          Favorite,
          Sale,
          ProductSale,
          ProductImage,
          UserProvider,
          OAuthLogin,
        ],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      Product,
      Category,
      Cart,
      CartItem,
      Order,
      OrderItem,
      Payment,
      Shipping,
      Favorite,
      Sale,
      ProductSale,
      ProductImage,
      UserProvider,
      OAuthLogin,
    ]),
    AuthModule,
  ],
  controllers: [
    UserController,
    ProductController,
    CategoryController,
    CartController,
    OrderController,
  ],
  providers: [
    UserService,
    ProductService,
    CategoryService,
    CartService,
    OrderService,
  ],
  exports: [
    UserService,
    ProductService,
    CategoryService,
    CartService,
    OrderService,
  ],
})
export class AppModule {}
