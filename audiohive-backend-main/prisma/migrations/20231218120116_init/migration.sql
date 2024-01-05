/*
  Warnings:

  - Added the required column `merchQty` to the `Merch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketQty` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merch" ADD COLUMN     "merchQty" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "ticketQty" DOUBLE PRECISION NOT NULL;
