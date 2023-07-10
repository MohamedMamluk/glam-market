import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [
    PassportModule,
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
  providers: [AuthService, LocalStrategy, RoleGuard],
  exports: [UserModule],
})
export class AuthModule {}
