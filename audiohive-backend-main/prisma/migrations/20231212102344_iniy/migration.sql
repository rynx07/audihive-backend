/*
  Warnings:

  - You are about to drop the `MusicProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MusicianUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MusicProfile" DROP CONSTRAINT "MusicProfile_MusicID_fkey";

-- DropTable
DROP TABLE "MusicProfile";

-- DropTable
DROP TABLE "MusicianUser";
