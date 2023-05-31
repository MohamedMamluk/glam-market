import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Review } from 'src/review/schemas/review.schema';
import { User } from 'src/user/schemas/user.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: [] })
  colors: string[];

  @Prop()
  description: string;

  @Prop({ default: [] })
  category: string[];

  @Prop({ default: [] })
  tags: string[];

  @Prop()
  images: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  seller: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Review', default: [] })
  reviews: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
