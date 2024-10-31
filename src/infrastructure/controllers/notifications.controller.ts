import { RequestWithUser } from '@data/interfaces/request.interface';
import { GetNotificationsByUserUsecase } from '@domain/usecases/notifications/getNotificationsByUserID';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { Authorized, Get, HttpCode, JsonController, Req, UseBefore } from 'routing-controllers';
import Container from 'typedi';

@JsonController('/notifications')
@Authorized()
@UseBefore(CheckTokenExpiry)
export class NotificationsController {
  private getNotificationsByUserUsecase = Container.get(GetNotificationsByUserUsecase);

  @Get('/')
  @HttpCode(200)
  getNotificationsByUser(@Req() req: RequestWithUser) {
    return this.getNotificationsByUserUsecase.call(req);
  }
}
