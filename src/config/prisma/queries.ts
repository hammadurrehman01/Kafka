import * as util from 'util';
import { Prisma } from '@prisma/client';
import { performance } from 'perf_hooks';
import { logger } from '@infrastructure/common/logger';

export const PRISMA_QUERY_EXTENSION = Prisma.defineExtension({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        const start = performance.now();
        const result = await query(args);
        const end = performance.now();
        const time = end - start;
        logger.info(util.inspect({ model, operation, args, time }, { showHidden: false, depth: null, colors: true }));
        return result;
      },
    },
  },
});
