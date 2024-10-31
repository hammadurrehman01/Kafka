import { Container } from 'typedi';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { GetProfileUsecase } from '@domain/usecases/users/get_profile';
import { UpdateProfileDTO } from '@data/dtos/users/update_profile.dto';
import { UpdateProfileUsecase } from '@domain/usecases/users/update_profile';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { Authorized, Body, Get, HttpCode, JsonController, Put, Req, UploadedFile, UseBefore } from 'routing-controllers';

@JsonController('/users')
@Authorized()
@UseBefore(CheckTokenExpiry)
export class UsersController {
  private getProfileUsecase = Container.get(GetProfileUsecase);
  private updateProfileUsecase = Container.get(UpdateProfileUsecase);

  @Get('/profile')
  @HttpCode(200)
  getProfile(@Req() req: RequestWithUser) {
    return this.getProfileUsecase.call(req);
  }

  @Put('/profile')
  @HttpCode(200)
  updateProfile(@Req() req: RequestWithUser, @Body() data: UpdateProfileDTO, @UploadedFile('image') file?: Express.Multer.File) {
    return this.updateProfileUsecase.call(req, data);
  }
}
