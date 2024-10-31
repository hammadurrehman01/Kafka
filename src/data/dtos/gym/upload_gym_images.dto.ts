import { ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';
import { Service } from 'typedi';

@Service()
export class UploadGymImagesDTO {
  @IsString()
  @IsNotEmpty()
  readonly gym_id: string;

  @IsString({ each: true })
  @ArrayMinSize(1, { message: 'Images cannot be empty' })
  @IsNotEmpty()
  readonly images: string[];
}
