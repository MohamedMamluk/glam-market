import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post(':productId')
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
}
