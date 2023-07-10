import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserRole } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<Request>();

    return this.allowAccess(user as string, roles);
  }

  private allowAccess = async (
    userId: string,
    roles: UserRole[],
  ): Promise<boolean> => {
    const user = await this.userService.findUserById(userId);
    return roles.includes(user.role);
  };
}
