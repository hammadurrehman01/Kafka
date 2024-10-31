import { Prisma } from '@prisma/client';

export const PRISMA_COMPUTED_RESULT_EXTENSION = Prisma.defineExtension({
  result: {},
});
