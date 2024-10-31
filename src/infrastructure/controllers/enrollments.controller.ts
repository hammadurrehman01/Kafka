import Container from 'typedi';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { Authorized, Get, HttpCode, JsonController, Req, UseBefore } from 'routing-controllers';
import { GetEnrollmentsCountByUserUseCase } from '@domain/usecases/enrollments/get_enrollments_count_by_user';

@JsonController('/enrollments')
@Authorized()
@UseBefore(CheckTokenExpiry)
export class EnrollmentsController {
  private getEnrollmentsCountByUserUseCase = Container.get(GetEnrollmentsCountByUserUseCase);

  @Get('/count')
  @HttpCode(200)
  getEnrollmentsByUser(@Req() req: RequestWithUser) {
    return this.getEnrollmentsCountByUserUseCase.call(req);
  }
}
