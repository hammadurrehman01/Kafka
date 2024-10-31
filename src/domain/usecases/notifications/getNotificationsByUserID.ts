import { RequestWithUser } from '@data/interfaces/request.interface';
import { HttpResponse } from '@data/res/http_response';
import { NotificationsService } from '@data/services/notifications.service';
import { USER_NOT_FOUND_MESSAGE } from '@infrastructure/common/error_message';
import { HttpError } from 'routing-controllers';
import { Inject, Service } from 'typedi';

@Service()
export class GetNotificationsByUserUsecase {
  @Inject()
  private notificationsService: NotificationsService;

  public async call(req: RequestWithUser) {
    const user_id = req.user.id;

    if (!user_id) {
      throw new HttpError(404, USER_NOT_FOUND_MESSAGE);
    }

    const notifications = await this.notificationsService.getNotificationsByUserID(user_id);

    return new HttpResponse(notifications, false);
  }
}
