/*
  Warnings:

  - You are about to drop the `AdminUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_AdminID_fkey";

-- DropTable
DROP TABLE "AdminUsers";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_AdminID_fkey" FOREIGN KEY ("AdminID") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
