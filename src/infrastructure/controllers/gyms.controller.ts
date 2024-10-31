import Container from 'typedi';
import { CreateGymDTO } from '@data/dtos/gym/create_gym.dto';
import { CreateGymUseCase } from '@domain/usecases/gym/create_gym';
import { RequestWithUser } from '@data/interfaces/request.interface';
import { UploadGymImagesDTO } from '@data/dtos/gym/upload_gym_images.dto';
import { UploadGymImagesUseCase } from '@domain/usecases/gym/upload_gym_images';
import { CheckTokenExpiry } from '@infrastructure/middlewares/token_expiry.middleware';
import { ValidationMiddleware } from '@infrastructure/middlewares/validation.middleware';
import { Authorized, Body, HttpCode, JsonController, Patch, Post, Req, UseBefore } from 'routing-controllers';

@JsonController('gyms')
@Authorized()
@UseBefore(CheckTokenExpiry)
export class GymsController {
  private createGymUseCase = Container.get(CreateGymUseCase);
  private uploadGymImagesUseCase = Container.get(UploadGymImagesUseCase);

  @Post('/')
  @UseBefore(ValidationMiddleware(CreateGymDTO))
  @HttpCode(200)
  createGym(@Req() req: RequestWithUser, @Body() data: CreateGymDTO) {
    return this.createGymUseCase.call(req, data);
  }

  @Patch('/images')
  @HttpCode(200)
  uploadGymImages(@Body() data: UploadGymImagesDTO) {
    return this.uploadGymImagesUseCase.call(data);
  }
}
