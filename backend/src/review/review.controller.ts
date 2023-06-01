import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('product/:productId/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post('')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async createReview(
    @Body() reviewBody: CreateReviewDto,
    @Req() request: Request,
    @Param('productId') productId: string,
  ) {
    const fullReviewBody: CreateReviewDto & { user: string; product: string } =
      {
        ...reviewBody,
        user: request.user as string,
        product: productId,
      };
    return this.reviewService.createReview(fullReviewBody);
  }

  @Get('')
  async getReviewsForProduct(@Param('productId') productId: string) {
    return this.reviewService.getReviewsForProduct(productId);
  }

  @Get(':reviewId')
  async getReview(@Param('reviewId') reviewId: string) {
    return this.reviewService.getReview(reviewId);
  }
}
