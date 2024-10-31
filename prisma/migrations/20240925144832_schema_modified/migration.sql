/*
  Warnings:

  - You are about to drop the column `class_id` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the `ClassesAttends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassesAttends" DROP CONSTRAINT "ClassesAttends_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassesAttends" DROP CONSTRAINT "ClassesAttends_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_class_id_fkey";

-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "class_id",
DROP COLUMN "count";

-- DropTable
DROP TABLE "ClassesAttends";

-- CreateTable
CREATE TABLE "Enrollments" (
    "id" TEXT NOT NULL,
    "class_id" TEXT,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
