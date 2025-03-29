import { IsString, IsEnum } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentType {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
}

export enum ShippingMethod {
  STANDARD = 'standard',
  EXPRESS = 'express',
  OVERNIGHT = 'overnight',
}

export class CreateOrderDto {
  @IsString()
  cart_id: string;

  @IsString()
  @IsEnum(PaymentType)
  payment_type: PaymentType;

  @IsString()
  @IsEnum(ShippingMethod)
  shipping_method: ShippingMethod;
}

export class UpdateOrderStatusDto {
  @IsString()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
