/*
  Warnings:

  - Added the required column `category` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "USER_ROLES" AS ENUM ('TRAINEE', 'INSTRUCTOR', 'GYM_OWNER');

-- CreateEnum
CREATE TYPE "ACCOUNT_TYPE" AS ENUM ('INDIVIDUAL', 'GYM');

-- DropIndex
DROP INDEX "Users_email_key";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "account_type" "ACCOUNT_TYPE",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "documents" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "role" "USER_ROLES" NOT NULL,
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "verified" BOOLEAN,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- DropEnum
DROP TYPE "USER_TYPES";

-- CreateTable
CREATE TABLE "TeamMembers" (
    "id" TEXT NOT NULL,
    "gym_owner_id" TEXT,
    "name" TEXT,
    "email" TEXT,
    "verified" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GymOwners" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GymOwners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TeamMembers_gym_owner_id_idx" ON "TeamMembers" USING HASH ("gym_owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "GymOwners_user_id_key" ON "GymOwners"("user_id");

-- AddForeignKey
ALTER TABLE "TeamMembers" ADD CONSTRAINT "TeamMembers_gym_owner_id_fkey" FOREIGN KEY ("gym_owner_id") REFERENCES "GymOwners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymOwners" ADD CONSTRAINT "GymOwners_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
