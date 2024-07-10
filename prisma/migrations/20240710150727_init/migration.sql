-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "expires_at" SET DEFAULT now() + interval '7 day';
