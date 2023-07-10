import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/schemas/user.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';
import { UpdateReviewGuard } from './update-review.guard';

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

  @Patch(':reviewId')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), UpdateReviewGuard)
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body() updateBody: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(reviewId, updateBody);
  }
}
