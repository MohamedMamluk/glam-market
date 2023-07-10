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
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private JwtService: JwtService,
  ) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  //@UseInterceptors(ResponseInterceptor) // Apply the ResponseInterceptor
  registerUser(@Body() createUserData: RegisterUserDto) {
    return this.userService.createUser(createUserData);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ResponseInterceptor) // Apply the ResponseInterceptor
  async loginUser(@Req() req) {
    const user = req.user;

    const token = await this.JwtService.signAsync({ id: user._doc._id });

    return token;
  }
}
