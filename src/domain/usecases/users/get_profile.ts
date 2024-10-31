import { Inject, Service } from 'typedi';
import { HttpError } from 'routing-controllers';
import { HttpResponse } from '@data/res/http_response';
import { UsersService } from '@data/services/users.service';
import { ClassesService } from '@data/services/classes.service';
import { ReviewsService } from '@data/services/reviews.service';
import { DateToMiliSeconds } from '@infrastructure/common/date';
import { FavoritesService } from '@data/services/favorites.service';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { USER_NOT_FOUND_MESSAGE } from '@infrastructure/common/error_message';

@Service()
export class GetProfileUsecase {
  @Inject()
  userService: UsersService;
  @Inject()
  classService: ClassesService;
  @Inject()
  reviewService: ReviewsService;
  @Inject()
  favoritesService: FavoritesService;

  public async call(req: RequestWithUser) {
    const user_id = req.user.id;
    const user = await this.userService.getUserByID(user_id);

    if (!user) {
      throw new HttpError(404, USER_NOT_FOUND_MESSAGE);
    }

    const response = {
      ...user,
      created_at: DateToMiliSeconds(user.created_at),
      updated_at: DateToMiliSeconds(user.updated_at),
    };

    return new HttpResponse(response, false);
  }
}
