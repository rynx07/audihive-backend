-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MUSICIAN', 'EVENT_ORG');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';
