import { UploadGymImagesDTO } from '@data/dtos/gym/upload_gym_images.dto';
import { HttpResponse } from '@data/res/http_response';
import { GymsService } from '@data/services/gyms.service';
import { Inject, Service } from 'typedi';

@Service()
export class UploadGymImagesUseCase {
  @Inject()
  private gym_service: GymsService;

  public async call(data: UploadGymImagesDTO) {
    const images = await this.gym_service.uploadGymImages(data);
    return new HttpResponse(images, false);
  }
}
