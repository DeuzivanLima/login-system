/*
  Warnings:

  - Added the required column `owner_username` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "owner_username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expires_at" SET DEFAULT now() + interval '7 day';
