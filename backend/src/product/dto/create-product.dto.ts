import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsArray,
  MinLength,
  ArrayMinSize,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  category: string[];

  @IsArray()
  @ArrayMinSize(1)
  images: string[];
}
