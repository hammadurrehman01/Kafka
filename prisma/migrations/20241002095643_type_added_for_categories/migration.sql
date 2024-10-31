/*
  Warnings:

  - Added the required column `type` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoriesType" AS ENUM ('GYM', 'INDIVIDUAL');

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "type" "CategoriesType" NOT NULL;
