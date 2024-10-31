import { Service } from 'typedi';
import database from '@config/database';
import { ONBOARDING_STATUS, USER_TYPES } from '@prisma/client';
import { UpdateProfileDTO } from '@data/dtos/users/update_profile.dto';

@Service()
export class UsersService {
  private users = database.instance.users;

  getUserByID(id: string) {
    return this.users.findUnique({
      where: { id },
    });
  }

  updateUserByID(user_id: string, data: UpdateProfileDTO) {
    return this.users.update({
      where: { id: user_id },
      data: {
        name: data.name,
        image: data.image,
        summary: data.summary,
      },
    });
  }

  updateUserAccountType(user_id, type: USER_TYPES) {
    return this.users.update({
      where: { id: user_id },
      data: {
        type: type,
      },
    });
  }

  updateUserOnBoardingStatus(user_id: string, onboarding: ONBOARDING_STATUS) {
    return this.users.update({
      where: { id: user_id },
      data: {
        onboarding,
      },
    });
  }
}
