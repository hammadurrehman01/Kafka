import { RequestWithUser } from '@data/interfaces/request.interface';
import { HttpResponse } from '@data/res/http_response';
import { ReviewsService } from '@data/services/reviews.service';
import { USER_NOT_FOUND_MESSAGE } from '@infrastructure/common/error_message';
import { HttpError } from 'routing-controllers';
import { Inject, Service } from 'typedi';

@Service()
export class GetReviewsCountByUserUseCase {
  @Inject()
  private reviewsService: ReviewsService;

  public async call(req: RequestWithUser) {
    const user_id = req.user.id;
    if (!user_id) {
      throw new HttpError(404, USER_NOT_FOUND_MESSAGE);
    }
    const result = await this.reviewsService.getReviewsCountByUserID(user_id);
    return new HttpResponse(result, false);
  }
}
