import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsArray,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock_quantity: number;

  @IsNumber()
  category_id: number;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  image_urls?: string[];
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock_quantity?: number;

  @IsNumber()
  @IsOptional()
  category_id?: number;
}

export class ProductFilterDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  category?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @Type(() => Boolean)
  inStock?: boolean;
}
