import { HttpResponse } from '@data/res/http_response';
import { CategoriesService } from '@data/services/categories.service';
import { CategoriesType, USER_TYPES } from '@prisma/client';
import { Inject, Service } from 'typedi';

@Service()
export class GetAllCategoriesUseCase {
  @Inject()
  private categories_service: CategoriesService;

  public async call(type?: string) {
    let categories;
    const { BUSINESS, INDIVIDUAL } = CategoriesType;

    switch (type) {
      case USER_TYPES.BUSINESS:
        categories = await this.categories_service.getAllCategories(BUSINESS);
        break;
      case USER_TYPES.INDIVIDUAL:
        categories = await this.categories_service.getAllCategories(INDIVIDUAL);
        break;
      default:
        categories = await this.categories_service.getAllCategories();
        break;
    }
    return new HttpResponse(categories, false);
  }
}
