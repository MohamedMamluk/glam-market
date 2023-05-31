import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseInterceptor } from 'src/interceptors/responseInterceptor';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private JwtService: JwtService,
  ) {}

  @UsePipes(ValidationPipe)
  @UseInterceptors(ResponseInterceptor) // Apply the ResponseInterceptor
  @Post('register')
  registerUser(@Body() createUserData: RegisterUserDto) {
    return this.userService.createUser(createUserData);
  }

  @UsePipes(ValidationPipe)
  @UseInterceptors(ResponseInterceptor) // Apply the ResponseInterceptor
  @Post('login')
  async loginUser(@Body() loginUserData: LoginUserDto) {
    const user = await this.userService.loginUser(loginUserData);

    if (!user) {
      return { error: 'something went wrong' };
    }

    const token = await this.JwtService.signAsync({ id: user._id });

    return token;
  }
}
