import { Inject, Service } from 'typedi';
import { HttpResponse } from '@data/res/http_response';
import { CategoriesService } from '@data/services/categories.service';
import { BulkCreateCategoriesDTO } from '@data/dtos/categories/bulk_categories.dto';

@Service()
export class BulkCreateCategoriesUseCase {
  @Inject()
  private categories_service: CategoriesService;

  public async call({ data }: BulkCreateCategoriesDTO) {
    const categories = await this.categories_service.bulkCreate(data);
    return new HttpResponse(categories, false);
  }
}
