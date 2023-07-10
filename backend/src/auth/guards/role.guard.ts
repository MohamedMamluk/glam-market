import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string[]>('role', context.getHandler());

    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user;

    return this.allowAccess(request);
  }

  private allowAccess = async (request: Request): Promise<boolean> => {
    return true;
  };
}
