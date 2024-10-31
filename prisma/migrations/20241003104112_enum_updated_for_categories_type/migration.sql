/*
  Warnings:

  - The values [GYM] on the enum `CategoriesType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoriesType_new" AS ENUM ('BUSINESS', 'INDIVIDUAL');
ALTER TABLE "Categories" ALTER COLUMN "type" TYPE "CategoriesType_new" USING ("type"::text::"CategoriesType_new");
ALTER TYPE "CategoriesType" RENAME TO "CategoriesType_old";
ALTER TYPE "CategoriesType_new" RENAME TO "CategoriesType";
DROP TYPE "CategoriesType_old";
COMMIT;
