import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePerfumeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  brand: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
