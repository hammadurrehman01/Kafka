import 'reflect-metadata';
import { App } from './app';
import { Events } from '@config/events';
import { ValidateEnv } from '@infrastructure/common/validateEnv';
import { UsersController } from '@infrastructure/controllers/users.controller';
import { ClassesController } from '@infrastructure/controllers/classes.controller';
import { CoachesController } from '@infrastructure/controllers/coaches.controller';
import { ReviewsController } from '@infrastructure/controllers/reviews.controller';
import { RewardsController } from '@infrastructure/controllers/rewards.controller';
import { FavoritesController } from '@infrastructure/controllers/favorites.controller';
import { CustomersController } from '@infrastructure/controllers/customers.controller';
import { CategoriesController } from '@infrastructure/controllers/categories.controller';
import { EnrollmentsController } from '@infrastructure/controllers/enrollments.controller';
import { HealthCheckController } from '@infrastructure/controllers/healthcheck.controller';
import { NotificationsController } from '@infrastructure/controllers/notifications.controller';
import { GymsController } from '@infrastructure/controllers/gyms.controller';

ValidateEnv();

const app = new App([
  UsersController,
  CustomersController,
  HealthCheckController,
  CategoriesController,
  ClassesController,
  EnrollmentsController,
  FavoritesController,
  ReviewsController,
  RewardsController,
  CoachesController,
  NotificationsController,
  GymsController,
]);

Events.register([]);

app.listen();
