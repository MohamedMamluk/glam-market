import { IsNumber, IsMongoId, IsString } from 'class-validator';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';

export class CreateReviewDto {
  @IsNumber()
  rating: number;

  @IsString()
  comment: string;
}
