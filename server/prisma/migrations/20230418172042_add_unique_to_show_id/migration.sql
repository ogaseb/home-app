/*
    Warnings:

    - A unique constraint covering the columns `[showId]` on the table `Shows` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shows_showId_key" ON "Shows"("showId");
