export const PAGINATION_CONFIG = {
  SKIP: 10,
  ITEM_PER_PAGE: 10,
};

export const getRemainingPageForDefaultConfig = (count: number) => Math.ceil(count / PAGINATION_CONFIG.ITEM_PER_PAGE);
