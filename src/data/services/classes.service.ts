import database from '@config/database';
import { Service } from 'typedi';

@Service()
export class ClassesService {
  private classes = database.instance.classes;

  getAllClasses() {
    return this.classes.findMany();
  }

  getUpcomingClassesByCoach(coach_id: string) {
    return this.classes.findMany({
      where: {
        coach_id: coach_id,
        OR: [
          {
            start_date: {
              gte: new Date(),
            },
          },
          {
            start_time: {
              gte: Date.now(),
            },
          },
        ],
      },
    });
  }
}
