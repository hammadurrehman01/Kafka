-- CreateEnum
CREATE TYPE "USER_TYPES" AS ENUM ('ADMIN', 'OWNER', 'MEMBER');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "auth_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_auth_id_key" ON "Users"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Users_auth_id_idx" ON "Users" USING HASH ("auth_id");
