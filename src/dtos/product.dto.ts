import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsArray,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsUUID()
  @IsOptional()
  product_id?: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  collection_ids?: string[];

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  slug: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock_quantity: number;

  @IsString()
  category_id: string;

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

  @IsString()
  @IsOptional()
  category_id?: string;
}

export class ProductFilterDto {
  @IsNumber()
  @IsOptional()
  @Type(() => String)
  category?: string;

  @IsString()
  @IsOptional()
  slug?: string;

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
