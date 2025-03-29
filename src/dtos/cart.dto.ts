import { IsString, IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @IsString()
  product_id: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @IsString()
  product_id: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}
