import database from '@config/database';
import { Service } from 'typedi';

@Service()
export class EnrollmentsService {
  private enrollments = database.instance.enrollments;

  getEnrollmentCountByUser(user_id: string) {
    return this.enrollments.count({
      where: { user_id },
    });
  }

  getEnrollmentsByClasses(class_id: string[]) {
    return this.enrollments.groupBy({
      by: ['class_id'],
      _count: { user_id: true },
      where: {
        class_id: {
          in: class_id,
        },
      },
    });
  }

  getEnrollmentsByClassAndUser(class_ids: string[], user_id: string) {
    return this.enrollments.findMany({
      where: {
        class_id: {
          in: class_ids,
        },
        user_id,
      },
      include: {
        user: true,
      },
    });
  }
}
