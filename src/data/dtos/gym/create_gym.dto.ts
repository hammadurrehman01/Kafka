import { IsEnum } from 'class-validator';
import { USER_TYPES } from '@prisma/client';

export class CreateGymDTO {
  @IsEnum(USER_TYPES)
  readonly type: USER_TYPES;
}
