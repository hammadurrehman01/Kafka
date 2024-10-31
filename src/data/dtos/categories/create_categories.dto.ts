import { CategoriesType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateCategoriesDTO {
  @IsString()
  readonly name: string;

  @IsEnum(CategoriesType)
  readonly type: CategoriesType;
}
