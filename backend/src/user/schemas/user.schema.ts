import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: [true, 'firstName is required'] })
  firstName: string;

  @Prop({ required: [true, 'lastName is required'] })
  lastName: string;

  @Prop({ required: [true, 'email is required'] })
  email: string;

  @Prop({ required: [true, 'password is required'] })
  hashedPassword: string;
}

export const userSchema = SchemaFactory.createForClass(User);
