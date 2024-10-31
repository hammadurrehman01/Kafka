/*
  Warnings:

  - You are about to drop the column `verified` on the `TeamMembers` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TeamMembers" DROP COLUMN "verified";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "verified";
