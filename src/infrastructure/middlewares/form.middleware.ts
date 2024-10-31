import { validate } from 'class-validator';
import { ValidationError } from 'class-validator';
import { HttpError } from 'routing-controllers';
/**
 * @name FormValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation for FormData
 * @param data object
 */
export const FormValidationMiddleware = async (data: object) => {
  const errors = await validate(data);

  if (errors.length > 0) {
    const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
    throw new HttpError(400, String(message));
  }

  return;
};
