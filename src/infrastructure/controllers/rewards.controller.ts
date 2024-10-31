import { RequestWithUser } from '@data/interfaces/request.interface';
import { GetRewardPointsUsecase } from '@domain/usecases/rewards/get_reward_points';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { Authorized, Get, HttpCode, JsonController, Req, UseBefore } from 'routing-controllers';
import Container from 'typedi';

@JsonController('/reward')
@Authorized()
@UseBefore(CheckTokenExpiry)
export class RewardsController {
  private getRewardPointsUsecase = Container.get(GetRewardPointsUsecase);

  @Get('/points')
  @HttpCode(200)
  getProfile(@Req() req: RequestWithUser) {
    return this.getRewardPointsUsecase.call(req);
  }
}
