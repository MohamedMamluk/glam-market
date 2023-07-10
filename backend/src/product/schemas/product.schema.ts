import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Review } from 'src/review/schemas/review.schema';
import { User } from 'src/user/schemas/user.schema';

export type ProductDocument = HydratedDocument<Product>;
@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: [] })
  colors: string[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: [] })
  category: string[];

  @Prop({ default: [] })
  tags: string[];

  @Prop({ required: true, default: [] })
  images: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  seller: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Review', default: [] })
  reviews: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
