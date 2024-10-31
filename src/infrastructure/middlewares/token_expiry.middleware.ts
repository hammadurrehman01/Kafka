import { HttpError } from 'routing-controllers';
import { parseJwt } from '@infrastructure/common/jwt';
import { getAuthorization } from './auth.middleware';
import { NextFunction, Request, Response } from 'express';

export const CheckTokenExpiry = (req: Request, _: Response, next: NextFunction) => {
  const Authorization = getAuthorization(req);
  if (!Authorization) {
    throw new HttpError(400, 'No token found');
  }
  const { exp } = parseJwt(Authorization);
  const is_token_expired = exp * 1000 < Date.now();
  if (is_token_expired) {
    throw new HttpError(400, 'invalid token');
  }
  next();
};
