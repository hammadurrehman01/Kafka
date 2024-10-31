import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly stripe_customer_id: string;
}
