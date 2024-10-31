/*
  Warnings:

  - You are about to drop the column `class_id` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `from_duration` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `instructor_id` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `to_duration` on the `Classes` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Classes` table. All the data in the column will be lost.
  - The `image` column on the `Classes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `liked` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Gyms` table. All the data in the column will be lost.
  - You are about to drop the column `account_type` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `documents` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Instructors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ratings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rewards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coach_id` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequency` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_capacity` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_price` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Made the column `gym_id` on table `Classes` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status` to the `Enrollments` table without a default value. This is not possible if the table is not empty.
  - Made the column `class_id` on table `Enrollments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Enrollments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `class_id` on table `Favorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Favorites` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `owner_id` to the `Gyms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `Notifications` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `type` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "USER_TYPES" AS ENUM ('COACH', 'INDIVIDUAL', 'BUSINESS', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "FREQUENCY" AS ENUM ('ONCE', 'REPEAT');

-- CreateEnum
CREATE TYPE "DAYS" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- CreateEnum
CREATE TYPE "NOTIFICATIONS_TYPES" AS ENUM ('CLASSES', 'REPORTS', 'CAMPAIGNS', 'PROMOTIONS');

-- CreateEnum
CREATE TYPE "ENROLLMENT_STATUS" AS ENUM ('PENDING', 'ACCEPTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ONBOARDING_STATUS" AS ENUM ('STARTED', 'BUSINESS_INFO', 'BUSINESS_IMAGES', 'BUSINESS_DOCUMENTS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_instructor_id_fkey";

-- DropForeignKey
ALTER TABLE "Gyms" DROP CONSTRAINT "Gyms_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Instructors" DROP CONSTRAINT "Instructors_gym_id_fkey";

-- DropForeignKey
ALTER TABLE "Instructors" DROP CONSTRAINT "Instructors_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Ratings" DROP CONSTRAINT "Ratings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Rewards" DROP CONSTRAINT "Rewards_user_id_fkey";

-- DropIndex
DROP INDEX "Gyms_user_id_key";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "class_id",
DROP COLUMN "title",
DROP COLUMN "type",
DROP COLUMN "user_id",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Classes" DROP COLUMN "from_duration",
DROP COLUMN "instructor_id",
DROP COLUMN "location",
DROP COLUMN "to_duration",
DROP COLUMN "type",
ADD COLUMN     "address" JSONB NOT NULL,
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "coach_id" TEXT NOT NULL,
ADD COLUMN     "days" "DAYS"[],
ADD COLUMN     "description" TEXT,
ADD COLUMN     "discount_price" DOUBLE PRECISION,
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "end_time" INTEGER,
ADD COLUMN     "frequency" "FREQUENCY" NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "max_capacity" INTEGER NOT NULL,
ADD COLUMN     "original_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "schedule" TIMESTAMP(3),
ADD COLUMN     "start_date" TIMESTAMP(3),
ADD COLUMN     "start_time" INTEGER,
DROP COLUMN "image",
ADD COLUMN     "image" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "gym_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Enrollments" ADD COLUMN     "status" "ENROLLMENT_STATUS" NOT NULL,
ADD COLUMN     "terms_accepted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "class_id" SET NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "liked",
ALTER COLUMN "class_id" SET NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Gyms" DROP COLUMN "user_id",
ADD COLUMN     "documents" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "data" JSONB,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "NOTIFICATIONS_TYPES" NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "account_type",
DROP COLUMN "category_id",
DROP COLUMN "documents",
DROP COLUMN "role",
DROP COLUMN "summary",
ADD COLUMN     "onboarding" "ONBOARDING_STATUS" NOT NULL DEFAULT 'STARTED',
ADD COLUMN     "type" "USER_TYPES" NOT NULL;

-- DropTable
DROP TABLE "Instructors";

-- DropTable
DROP TABLE "Ratings";

-- DropTable
DROP TABLE "Rewards";

-- DropEnum
DROP TYPE "ACCOUNT_TYPE";

-- DropEnum
DROP TYPE "CARD_TYPES";

-- DropEnum
DROP TYPE "CATEGORIES_TYPES";

-- DropEnum
DROP TYPE "PROMOTION_TYPES";

-- DropEnum
DROP TYPE "USER_ROLES";

-- CreateTable
CREATE TABLE "GymCoaches" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "gym_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GymCoaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GymsHaveCategories" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "gym_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GymsHaveCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "summary" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "class_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Points" (
    "id" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckIns" (
    "id" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CheckIns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Categories_id_idx" ON "Categories" USING HASH ("id");

-- CreateIndex
CREATE INDEX "Categories_name_idx" ON "Categories" USING HASH ("name");

-- AddForeignKey
ALTER TABLE "Gyms" ADD CONSTRAINT "Gyms_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymCoaches" ADD CONSTRAINT "GymCoaches_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "Gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymCoaches" ADD CONSTRAINT "GymCoaches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymsHaveCategories" ADD CONSTRAINT "GymsHaveCategories_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "Gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymsHaveCategories" ADD CONSTRAINT "GymsHaveCategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "GymCoaches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Points" ADD CONSTRAINT "Points_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckIns" ADD CONSTRAINT "CheckIns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckIns" ADD CONSTRAINT "CheckIns_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "Enrollments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
