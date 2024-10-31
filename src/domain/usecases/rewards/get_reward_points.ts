import { RequestWithUser } from '@data/interfaces/request.interface';
import { HttpResponse } from '@data/res/http_response';
import { RewardsService } from '@data/services/rewards.service';
import { getSum } from '@infrastructure/common/math';
import { HttpError, InternalServerError } from 'routing-controllers';
import { Inject, Service } from 'typedi';

@Service()
export class GetRewardPointsUsecase {
  @Inject()
  rewardsService: RewardsService;

  public async call(req: RequestWithUser) {
    try {
      const user_id = req.user.id;
      const rewards = await this.rewardsService.getRewardsByUserID(user_id);

      const points = getSum(rewards.map(i => i.points));
      return new HttpResponse(points, false);
    } catch (error) {
      return new HttpError(400, error.message || InternalServerError);
    }
  }
}
