import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ReviewService } from './review.service';
import { Types } from 'mongoose';

@Injectable()
export class UpdateReviewGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private reviewService: ReviewService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = this.reflector.get<string>('user', request);

    const isAdmin = this.reflector.get<boolean>('admin', request);

    const { reviewId } = request.params;
    const review = await this.reviewService.getReview(reviewId);

    // const reviewUserId = review.user;
    const reviewUserId = new Types.ObjectId(review.user);

    if (isAdmin || reviewUserId.equals(request.user)) {
      return true;
    }

    return false;
  }
}
