import { CreateGymDTO } from '@data/dtos/gym/create_gym.dto';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { HttpResponse } from '@data/res/http_response';
import { CategoriesService } from '@data/services/categories.service';
import { CognitoService } from '@data/services/cognito.service';
import { GymsService } from '@data/services/gyms.service';
import { UsersService } from '@data/services/users.service';
import { USER_NOT_FOUND_MESSAGE } from '@infrastructure/common/error_message';
import { ONBOARDING_STATUS, USER_TYPES } from '@prisma/client';
import { HttpError } from 'routing-controllers';
import { Inject, Service } from 'typedi';

@Service()
export class CreateGymUseCase {
  @Inject()
  private cognito: CognitoService;
  @Inject()
  private gyms_service: GymsService;
  @Inject()
  private users_service: UsersService;
  @Inject()
  private categories: CategoriesService;

  public async call(req: RequestWithUser, data: CreateGymDTO) {
    const user_id = req.user.id;
    const user = await this.users_service.getUserByID(user_id);
    if (!user) {
      throw new HttpError(404, USER_NOT_FOUND_MESSAGE);
    }

    const category_name = user.type === USER_TYPES.BUSINESS ? 'Gym' : 'Weight Lifting';
    const category = await this.categories.findCategoryByName(category_name);
    const onboarding = ONBOARDING_STATUS.BUSINESS_INFO;

    const [gym] = await Promise.all([
      this.gyms_service.createGym(user_id, category.id),
      this.users_service.updateUserOnBoardingStatus(user_id, onboarding),
      this.users_service.updateUserAccountType(user_id, data.type),
      this.cognito.updateUserRole(user_id, data.type),
    ]);
    return new HttpResponse(gym, false);
  }
}
