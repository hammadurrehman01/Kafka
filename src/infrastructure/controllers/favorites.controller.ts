import { RequestWithUser } from '@data/interfaces/request.interface';
import { GetFavoritesUseCase } from '@domain/usecases/favorites/get_favorites_by_user';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { Authorized, Get, HttpCode, JsonController, Req, UseBefore } from 'routing-controllers';
import Container from 'typedi';

@JsonController('/favorites')
@Authorized()
@UseBefore(CheckTokenExpiry)
export class FavoritesController {
  private getFavoritesUseCase = Container.get(GetFavoritesUseCase);

  @Get('/')
  @HttpCode(200)
  getReviews(@Req() req: RequestWithUser) {
    return this.getFavoritesUseCase.call(req);
  }
}
