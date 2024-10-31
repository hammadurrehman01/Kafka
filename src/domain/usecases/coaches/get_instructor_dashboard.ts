import { HttpResponse } from '@data/res/http_response';
import { Service } from 'typedi';

@Service()
export class GetInstructorDashboardUseCase {
  public async call() {
    // TODO: Replace hardcoded data with dynamic `classes` data once available.

    const response = [
      {
        name: 'Mitch Barrett',
        role: 'Trainer',
        sessions_count: 27,
        upcoming_classes: [
          {
            title: 'Weight Lifting 101',
            from_duration: '10:30',
            to_duration: '11:30',
          },
          {
            title: 'Cardio',
            from_duration: '08:30',
            to_duration: '09:30',
          },
        ],
      },
    ];

    return new HttpResponse(response, false);
  }
}
