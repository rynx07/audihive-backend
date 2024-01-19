/*
  Warnings:

  - You are about to drop the column `createdAt` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `File` table. All the data in the column will be lost.
  - Added the required column `originalname` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "createdAt",
DROP COLUMN "data",
DROP COLUMN "filename",
DROP COLUMN "mimetype",
DROP COLUMN "updatedAt",
ADD COLUMN     "originalname" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
