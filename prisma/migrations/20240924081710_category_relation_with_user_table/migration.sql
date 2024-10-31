/*
  Warnings:

  - You are about to drop the column `usersId` on the `Ratings` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `GymOwners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_instructor_id_fkey";

-- DropForeignKey
ALTER TABLE "GymOwners" DROP CONSTRAINT "GymOwners_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TeamMembers" DROP CONSTRAINT "TeamMembers_gym_owner_id_fkey";

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "Classes" ADD COLUMN     "gym_id" TEXT;

-- AlterTable
ALTER TABLE "Ratings" DROP COLUMN "usersId";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "category",
ADD COLUMN     "category_id" TEXT;

-- DropTable
DROP TABLE "GymOwners";

-- DropTable
DROP TABLE "TeamMembers";

-- CreateTable
CREATE TABLE "Instructors" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "gym_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instructors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gyms" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gyms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Instructors_user_id_idx" ON "Instructors" USING HASH ("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Instructors_user_id_gym_id_key" ON "Instructors"("user_id", "gym_id");

-- CreateIndex
CREATE UNIQUE INDEX "Gyms_user_id_key" ON "Gyms"("user_id");

-- AddForeignKey
ALTER TABLE "Instructors" ADD CONSTRAINT "Instructors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructors" ADD CONSTRAINT "Instructors_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "Gyms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gyms" ADD CONSTRAINT "Gyms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "Gyms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "Instructors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
