import { RequestWithUser } from '@data/interfaces/request.interface';
import { HttpResponse } from '@data/res/http_response';
import { EnrollmentsService } from '@data/services/enrollments.service';
import { FavoritesService } from '@data/services/favorites.service';
import { ReviewsService } from '@data/services/reviews.service';
import { USER_NOT_FOUND_MESSAGE } from '@infrastructure/common/error_message';
import { HttpError } from 'routing-controllers';
import { Inject, Service } from 'typedi';

@Service()
export class GetFavoritesUseCase {
  @Inject()
  private favoritesService: FavoritesService;
  @Inject()
  private reviewsService: ReviewsService;
  @Inject()
  private enrollmentsService: EnrollmentsService;

  public async call(req: RequestWithUser) {
    try {
      const user_id = req.user.id;
      if (!user_id) {
        throw new HttpError(404, USER_NOT_FOUND_MESSAGE);
      }
      const favorites = await this.favoritesService.getAllFavoritesByUserID(user_id);
      const class_id = favorites.map(i => i.class_id);

      const [reviewByClass, instructors] = await Promise.all([
        this.reviewsService.getReviewsByClassID(class_id),
        this.enrollmentsService.getEnrollmentsByClassAndUser(class_id, user_id),
      ]);

      const response = favorites.map(favorite => ({
        title: favorite.class.title,
        rating: reviewByClass.find(r => r.class_id === favorite.class_id).stars,
        instructorName: instructors.find(f => f.class_id === favorite.class_id).user.name,
      }));
      return new HttpResponse(response, false);
    } catch (error) {
      return new HttpError(500, error.message);
    }
  }
}
