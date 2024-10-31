/*
  Warnings:

  - You are about to drop the column `auth_id` on the `Users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CARD_TYPES" AS ENUM ('PROMOTIONS', 'CLASSES');

-- CreateEnum
CREATE TYPE "PROMOTION_TYPES" AS ENUM ('DISCOUNT_20_PERCENT');

-- CreateEnum
CREATE TYPE "CATEGORIES_TYPES" AS ENUM ('WEIGHT_LIFTING', 'FLEXIBILITY', 'PILATES', 'CARDIO', 'CYCLING');

-- DropIndex
DROP INDEX "Users_auth_id_idx";

-- DropIndex
DROP INDEX "Users_auth_id_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "auth_id",
ADD COLUMN     "device_id" TEXT;

-- CreateTable
CREATE TABLE "Rewards" (
    "id" TEXT NOT NULL,
    "points" INTEGER,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "CATEGORIES_TYPES" NOT NULL,
    "image" TEXT,
    "from_duration" INTEGER NOT NULL,
    "to_duration" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "instructor_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "type" "CATEGORIES_TYPES" NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "class_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,
    "liked" BOOLEAN,
    "class_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ratings" (
    "id" TEXT NOT NULL,
    "rating" INTEGER,
    "feedback" TEXT,
    "class_id" TEXT,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "usersId" TEXT,

    CONSTRAINT "Ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "count" INTEGER,
    "user_id" TEXT,
    "class_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassesAttends" (
    "id" TEXT NOT NULL,
    "class_id" TEXT,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassesAttends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Users_id_idx" ON "Users" USING HASH ("id");

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "GymOwners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ratings" ADD CONSTRAINT "Ratings_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassesAttends" ADD CONSTRAINT "ClassesAttends_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassesAttends" ADD CONSTRAINT "ClassesAttends_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
