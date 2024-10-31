import { RequestWithUser } from '@data/interfaces/request.interface';
import { GetReviewsByUserUseCase } from '@domain/usecases/reviews/get_reviews_by_user';
import { GetReviewsCountByUserUseCase } from '@domain/usecases/reviews/get_reviews_count_by_user';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { Authorized, Get, HttpCode, JsonController, Req, UseBefore } from 'routing-controllers';
import Container from 'typedi';

@JsonController('/reviews')
@Authorized()
@UseBefore(CheckTokenExpiry)
export class ReviewsController {
  private getReviewsByUserUseCase = Container.get(GetReviewsByUserUseCase);
  private getReviewsCountByUserUseCase = Container.get(GetReviewsCountByUserUseCase);

  @Get('/')
  @HttpCode(200)
  getReviews(@Req() req: RequestWithUser) {
    return this.getReviewsByUserUseCase.call(req);
  }

  @Get('/count')
  @HttpCode(200)
  getReviewsCountByUser(@Req() req: RequestWithUser) {
    return this.getReviewsCountByUserUseCase.call(req);
  }
}
