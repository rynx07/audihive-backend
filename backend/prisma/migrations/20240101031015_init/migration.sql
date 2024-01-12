/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Posts` will be added. If there are existing duplicate values, this will fail.
  - Made the column `profileId` on table `Posts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_profileId_fkey";

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "profileId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_profileId_key" ON "Comment"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_profileId_key" ON "Posts"("profileId");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("post_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
