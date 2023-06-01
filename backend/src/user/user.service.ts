import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserExistsError } from 'src/errors/UserExists';
import { createUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private User: Model<User>) {}

  async createUser(userData: createUserDto) {
    try {
      const isUserRegistered = await this.User.findOne({
        email: userData.email,
      });

      if (isUserRegistered) {
        throw new UserExistsError(`User already registered`);
      }

      const user = await this.User.create(userData);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginUser(loginData: { email: string; password: string }) {
    const { email, password } = loginData;
    try {
      const userExists = await this.User.findOne({ email });

      if (!userExists) {
        throw new UnauthorizedException(
          `Email or password is not valid, Please check and try again`,
        );
      }

      const isValidPassword = await userExists.comparePassword(password);

      if (!isValidPassword) {
        throw new UnauthorizedException(
          `Email or password is not valid, Please check and try again`,
        );
      }

      return userExists;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string) {
    return this.User.findOne({ email });
  }
}
