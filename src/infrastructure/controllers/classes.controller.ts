import Container from 'typedi';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { Authorized, Get, HttpCode, JsonController, UseBefore } from 'routing-controllers';
import { GetSponsoredClassesUseCase } from '@domain/usecases/classes/get_sponsored_classes';

@JsonController('/classes')
@Authorized()
@UseBefore(CheckTokenExpiry)
export class ClassesController {
  private getSponsoredClassesUseCase = Container.get(GetSponsoredClassesUseCase);

  @Get('/sponsored')
  @HttpCode(200)
  getSponsoredClasses() {
    return this.getSponsoredClassesUseCase.call();
  }
}
