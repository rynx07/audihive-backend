/*
  Warnings:

  - You are about to drop the column `date_posted` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `reacts` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "date_posted",
DROP COLUMN "reacts";
