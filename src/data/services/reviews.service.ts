import database from '@config/database';
import { Service } from 'typedi';

@Service()
export class ReviewsService {
  private reviews = database.instance.reviews;

  getReviewsCountByUserID(user_id: string) {
    return this.reviews.count({
      where: { user_id },
    });
  }

  getReviewsByClassID(class_id: string[]) {
    return this.reviews.findMany({
      where: {
        class_id: {
          in: class_id,
        },
      },
    });
  }

  getReviewsByUserID(user_id: string) {
    return this.reviews.findMany({
      where: { user_id },
    });
  }
}
