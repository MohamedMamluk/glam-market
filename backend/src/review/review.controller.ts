import {
  Body,
  Controller,
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
  @Post('create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async createReview(
    @Body() reviewBody: CreateReviewDto,
    @Req() request: Request,
  ) {
    const fullReviewBody: CreateReviewDto & { user: string } = {
      ...reviewBody,
      user: request.user as string,
    };
    console.log(request.user);
    return this.reviewService.createReview(fullReviewBody);
  }
}
