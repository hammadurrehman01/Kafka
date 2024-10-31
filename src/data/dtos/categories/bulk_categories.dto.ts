import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateCategoriesDTO } from './create_categories.dto';

export class BulkCreateCategoriesDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateCategoriesDTO)
  data: CreateCategoriesDTO[];
}
