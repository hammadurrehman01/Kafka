import { USER_TYPES } from '@prisma/client';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: USER_TYPES | string;
  category: string;
  summary: string;
  image: string;
  documents: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
