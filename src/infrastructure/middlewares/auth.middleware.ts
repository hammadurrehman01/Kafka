import { Action } from 'routing-controllers';
import { parseJwt } from '@infrastructure/common/jwt';

export const getAuthorization = req => {
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (action: Action): Promise<boolean> => {
  try {
    const req = action.request;
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { sub, exp } = parseJwt(Authorization);
      action.request.user = {
        id: sub,
        exp,
      };

      if (!action.request.user) return false;

      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
