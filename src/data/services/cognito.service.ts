import { Service } from 'typedi';
import { USER_TYPES } from '@prisma/client';
import { HttpError } from 'routing-controllers';
import { cognitoClient } from '@config/aws/cognito';
import { logger } from '@infrastructure/common/logger';
import { AWS_COGNITO_USER_POOL_ID } from '@config/environments';
import { INVALID_USER_ATTRIBUTES } from '@infrastructure/common/error_message';
import { AdminUpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider';

@Service()
export class CognitoService {
  async updateUserRole(user_id: string, role: USER_TYPES) {
    const userAttributes = [{ Name: 'role', Value: role }];

    const params = new AdminUpdateUserAttributesCommand({
      Username: user_id,
      UserAttributes: userAttributes,
      UserPoolId: AWS_COGNITO_USER_POOL_ID,
    });

    try {
      return await cognitoClient.send(params);
    } catch (error) {
      logger.error(error);
      throw new HttpError(400, INVALID_USER_ATTRIBUTES);
    }
  }
}
