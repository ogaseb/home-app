-- AlterTable
ALTER TABLE "Shows" ADD COLUMN         "isAdded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN         "isWatched" BOOLEAN NOT NULL DEFAULT false;
