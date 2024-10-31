import { Inject } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { ClassesService } from '@data/services/classes.service';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { EnrollmentsService } from '@data/services/enrollments.service';

export class GetUpcomingClassesByCoachUseCase {
  @Inject()
  private classes: ClassesService;
  @Inject()
  private enrollments: EnrollmentsService;

  public async call(req: RequestWithUser) {
    const user_id = req.user.id;
    const upcomingClasses = await this.classes.getUpcomingClassesByCoach(user_id);

    const classesIDs = upcomingClasses.map(i => i.id);
    const enrollments = await this.enrollments.getEnrollmentsByClasses(classesIDs);

    const response = upcomingClasses.map(item => ({
      title: item.title,
      image: item.image,
      address: item.address,
      latitude: item.latitude,
      longitude: item.longitude,
      start_date: item.start_date,
      start_time: item.start_time,
      end_date: item.end_date,
      end_time: item.end_time,
      max_capcity: item.max_capacity,
      enrollments: enrollments.find(i => i.class_id === item.id)?._count?.user_id || 0,
    }));
    return new HttpResponse(response, false);
  }
}
