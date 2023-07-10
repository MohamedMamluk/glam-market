import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserRole } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // Check if the user is an admin based on some condition.
    const user = await this.userService.findUserById(req.user as string);
    const isAdmin = user.role && user.role === UserRole.ADMIN ? true : false;
    // Add the isAdmin property to the request object.
    req.isAdmin = isAdmin;

    // Call the next middleware or the endpoint handler.
    next();
  }
}
