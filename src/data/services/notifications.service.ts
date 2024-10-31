import database from '@config/database';
import { Service } from 'typedi';
@Service()
export class NotificationsService {
  public notifications = database.instance.notifications;

  getNotificationsByUserID(user_id: string) {
    return this.notifications.findMany({
      where: { user_id },
      include: { user: true },
    });
  }
}
