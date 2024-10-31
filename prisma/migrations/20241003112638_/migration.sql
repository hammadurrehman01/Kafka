/*
  Warnings:

  - You are about to drop the `GymsHaveCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `Gyms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GymsHaveCategories" DROP CONSTRAINT "GymsHaveCategories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "GymsHaveCategories" DROP CONSTRAINT "GymsHaveCategories_gym_id_fkey";

-- AlterTable
ALTER TABLE "Gyms" ADD COLUMN     "category_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "GymsHaveCategories";

-- AddForeignKey
ALTER TABLE "Gyms" ADD CONSTRAINT "Gyms_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
