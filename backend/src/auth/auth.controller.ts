import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtService } from '@nestjs/jwt';
import { ResponseInterceptor } from 'src/interceptors/responseInterceptor';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';

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
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ResponseInterceptor) // Apply the ResponseInterceptor
  @Post('login')
  async loginUser(@Req() req) {
    const user: UserDocument = req.user;

    const token = await this.JwtService.signAsync({ id: user._id });

    return token;
  }
}
