import { Container } from 'typedi';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { Authorized, Get, HttpCode, JsonController, Req, UseBefore } from 'routing-controllers';
import { GetUpcomingClassesByCoachUseCase } from '@domain/usecases/coaches/get_upcoming_classes';
import { GetInstructorDashboardUseCase } from '@domain/usecases/coaches/get_instructor_dashboard';

@JsonController('/coaches')
@Authorized()
@UseBefore(CheckTokenExpiry)
export class CoachesController {
  private getInstructorDashboardUseCase = Container.get(GetInstructorDashboardUseCase);
  private getUpcomingClassesByCoachUseCase = Container.get(GetUpcomingClassesByCoachUseCase);

  @Get('/home')
  @HttpCode(200)
  getHomeData() {
    return this.getInstructorDashboardUseCase.call();
  }

  @Get('/upcoming=classes')
  @HttpCode(200)
  getUpcomingClassesByID(@Req() req: RequestWithUser) {
    return this.getUpcomingClassesByCoachUseCase.call(req);
  }
}
