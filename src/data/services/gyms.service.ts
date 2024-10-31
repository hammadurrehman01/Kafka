import database from '@config/database';
import { UploadGymImagesDTO } from '@data/dtos/gym/upload_gym_images.dto';
import { Service } from 'typedi';

@Service()
export class GymsService {
  private gyms = database.instance.gyms;

  createGym(user_id: string, category_id: string) {
    return this.gyms.create({
      data: { owner_id: user_id, category_id },
    });
  }

  findGymById(id: string) {
    return this.gyms.findUnique({ where: { id } });
  }

  updateGymCategory(id: string, category_id: string) {
    return this.gyms.update({
      where: {
        id,
      },
      data: { category_id },
    });
  }

  uploadGymImages(data: UploadGymImagesDTO) {
    return this.gyms.update({
      where: {
        id: data.gym_id,
      },
      data: {
        images: data.images,
      },
    });
  }
}
