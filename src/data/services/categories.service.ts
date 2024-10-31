import database from '@config/database';
import { Service } from 'typedi';
import { CategoriesType } from '@prisma/client';
import { CreateCategoriesDTO } from '@data/dtos/categories/create_categories.dto';

@Service()
export class CategoriesService {
  private categories = database.instance.categories;

  getAllCategories(type?: CategoriesType) {
    return this.categories.findMany({
      where: { type },
    });
  }

  bulkCreate(data: CreateCategoriesDTO[]) {
    return this.categories.createMany({
      data: data,
    });
  }

  findCategoryById(id: string) {
    return this.categories.findUnique({
      where: {
        id,
      },
    });
  }

  findCategoryByName(name: string) {
    return this.categories.findFirst({
      where: {
        name,
      },
    });
  }
}
