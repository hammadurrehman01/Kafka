import { RequestWithUser } from '@data/interfaces/request.interface';
import { HttpResponse } from '@data/res/http_response';
import { EnrollmentsService } from '@data/services/enrollments.service';
import { Inject, Service } from 'typedi';

@Service()
export class GetEnrollmentsCountByUserUseCase {
  @Inject()
  private enrollmentsService: EnrollmentsService;

  public async call(req: RequestWithUser) {
    const user_id = req.user.id;
    const result = await this.enrollmentsService.getEnrollmentCountByUser(user_id);

    return new HttpResponse(result, false);
  }
}
