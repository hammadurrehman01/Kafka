import Container from 'typedi';
import { BulkCreateCategoriesDTO } from '@data/dtos/categories/bulk_categories.dto';
import { GetAllCategoriesUseCase } from '@domain/usecases/categories/get_categories';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { BulkCreateCategoriesUseCase } from '@domain/usecases/categories/bulk_create_categories';
import { Authorized, Body, Get, HttpCode, JsonController, Post, QueryParam, UseBefore } from 'routing-controllers';

@JsonController('/categories')
export class CategoriesController {
  private getAllCategoriesUseCase = Container.get(GetAllCategoriesUseCase);
  private bulkCreateCategoriesUseCase = Container.get(BulkCreateCategoriesUseCase);

  @Get('/')
  @Authorized()
  @UseBefore(CheckTokenExpiry)
  @HttpCode(200)
  getAllCategories(@QueryParam('type', { required: false }) type?: string) {
    return this.getAllCategoriesUseCase.call(type);
  }

  @Post('/bulk')
  @HttpCode(200)
  @UseBefore(ValidationMiddleware(BulkCreateCategoriesDTO))
  createBulkCategories(@Body() data: BulkCreateCategoriesDTO) {
    return this.bulkCreateCategoriesUseCase.call(data);
  }
}
