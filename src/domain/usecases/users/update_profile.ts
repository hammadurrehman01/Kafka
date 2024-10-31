import { Inject, Service } from 'typedi';
import { HttpError } from 'routing-controllers';
import { HttpResponse } from '@data/res/http_response';
import { GymsService } from '@data/services/gyms.service';
import { UsersService } from '@data/services/users.service';
import { ONBOARDING_STATUS, USER_TYPES } from '@prisma/client';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { UpdateProfileDTO } from '@data/dtos/users/update_profile.dto';
import { USER_NOT_FOUND_MESSAGE } from '@infrastructure/common/error_message';

@Service()
export class UpdateProfileUsecase {
  @Inject()
  private users: UsersService;
  @Inject()
  private gyms: GymsService;

  public async call(req: RequestWithUser, data: UpdateProfileDTO) {
    const user_id = req.user.id;
    const user = await this.users.getUserByID(user_id);

    if (!user) {
      throw new HttpError(404, USER_NOT_FOUND_MESSAGE);
    }

    if (data.skipped) {
      const updated_user = await this.users.updateUserOnBoardingStatus(user_id, ONBOARDING_STATUS.COMPLETED);
      return new HttpResponse(updated_user, false);
    }

    const promises: Promise<any>[] = [this.users.updateUserByID(user_id, data)];

    switch (user.type) {
      case USER_TYPES.BUSINESS:
      case USER_TYPES.INDIVIDUAL:
        promises.push(this.gyms.updateGymCategory(user_id, data.category_id));
        promises.push(this.users.updateUserOnBoardingStatus(user_id, ONBOARDING_STATUS.BUSINESS_INFO));
        break;
      case USER_TYPES.CUSTOMER:
        promises.push(this.users.updateUserOnBoardingStatus(user_id, ONBOARDING_STATUS.COMPLETED));
      default:
        break;
    }

    const [updated_user] = await Promise.all(promises);

    return new HttpResponse(updated_user, false);
  }
}
