/*
  Warnings:

  - You are about to drop the column `documents` on the `Gyms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gyms" DROP COLUMN "documents";

-- CreateTable
CREATE TABLE "GymDocuments" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "gym_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GymDocuments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GymDocuments" ADD CONSTRAINT "GymDocuments_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "Gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
