-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "favoriteColor" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
