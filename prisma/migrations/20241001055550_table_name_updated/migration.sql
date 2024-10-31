/*
  Warnings:

  - You are about to drop the `Points` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Points" DROP CONSTRAINT "Points_user_id_fkey";

-- DropTable
DROP TABLE "Points";

-- CreateTable
CREATE TABLE "RewardPoints" (
    "id" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardPoints_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RewardPoints" ADD CONSTRAINT "RewardPoints_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
