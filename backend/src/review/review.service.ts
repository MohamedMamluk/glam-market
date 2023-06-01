import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async getReviewsForProduct(productId: string) {
    return this.reviewModel.find({ product: productId });
  }

  async getReview(reviewId: string) {
    return this.reviewModel.findById(reviewId);
  }

  async createReview(reviewBody: CreateReviewDto): Promise<ReviewDocument> {
    return this.reviewModel.create(reviewBody);
  }
}
