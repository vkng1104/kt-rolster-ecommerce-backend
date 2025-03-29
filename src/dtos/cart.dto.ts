import { IsString, IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @IsString()
  user_id: string;

  @IsString()
  product_id: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @IsNumber()
  @Min(0)
  quantity: number;
}
