/*
  Warnings:

  - Made the column `username` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstname` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "firstname" SET NOT NULL,
ALTER COLUMN "lastname" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL;
