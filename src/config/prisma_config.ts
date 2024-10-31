import { PrismaClient } from '@prisma/client';
import { PRISMA_QUERY_EXTENSION } from './prisma/queries';
import { PRISMA_MODEL_EXTENSION } from './prisma/models';
import { PRISMA_COMPUTED_RESULT_EXTENSION } from './prisma/computed-results';

export const prisma = new PrismaClient({
  log: ['query'],
})
  .$extends(PRISMA_QUERY_EXTENSION)
  .$extends(PRISMA_COMPUTED_RESULT_EXTENSION)
  .$extends(PRISMA_MODEL_EXTENSION);
