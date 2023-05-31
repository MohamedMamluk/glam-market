import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: `RgUkXp2s5v8y/B?D(G+KbPeShVmYq3t6`,
      signOptions: {
        expiresIn: '30d',
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
