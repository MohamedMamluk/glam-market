import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: [true, 'firstName is required'] })
  firstName: string;

  @Prop({ required: [true, 'lastName is required'] })
  lastName: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
  })
  email: string;

  @Prop({ required: [true, 'password is required'] })
  password: string;

  async comparePassword(candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre<UserDocument>('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
