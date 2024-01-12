/*
  Warnings:

  - You are about to drop the column `userId` on the `Merch` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `Merch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Merch" DROP CONSTRAINT "Merch_userId_fkey";

-- AlterTable
ALTER TABLE "Merch" DROP COLUMN "userId",
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Merch" ADD CONSTRAINT "Merch_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
