-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "nickname" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shows" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "showId" INTEGER NOT NULL,
    "posterPath" TEXT,
    "voteAverage" DOUBLE PRECISION NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Shows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Shows" ADD CONSTRAINT "Shows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
