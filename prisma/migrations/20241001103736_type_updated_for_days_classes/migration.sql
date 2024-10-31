/*
  Warnings:

  - The `days` column on the `Classes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Classes" DROP COLUMN "days",
ADD COLUMN     "days" TEXT[] DEFAULT ARRAY[]::TEXT[];
