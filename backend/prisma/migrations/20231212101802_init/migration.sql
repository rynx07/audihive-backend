/*
  Warnings:

  - You are about to drop the column `userID` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[AdminID]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userID_fkey";

-- DropIndex
DROP INDEX "Profile_userID_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userID",
ADD COLUMN     "AdminID" INTEGER;

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "AdminUsers" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "AdminUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicianUser" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MUSICIAN',

    CONSTRAINT "MusicianUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicProfile" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "MusicID" INTEGER NOT NULL,

    CONSTRAINT "MusicProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MusicProfile_MusicID_key" ON "MusicProfile"("MusicID");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_AdminID_key" ON "Profile"("AdminID");

-- AddForeignKey
ALTER TABLE "MusicProfile" ADD CONSTRAINT "MusicProfile_MusicID_fkey" FOREIGN KEY ("MusicID") REFERENCES "MusicianUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_AdminID_fkey" FOREIGN KEY ("AdminID") REFERENCES "AdminUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
