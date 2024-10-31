import database from '@config/database';
import { Service } from 'typedi';

@Service()
export class RewardsService {
  private rewards = database.instance.rewardPoints;

  getRewardsByUserID(user_id: string) {
    return this.rewards.findMany({
      where: {
        user_id,
      },
    });
  }
}
