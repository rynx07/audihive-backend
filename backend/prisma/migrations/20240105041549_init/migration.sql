-- AlterTable
ALTER TABLE "Merch" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Merch" ADD CONSTRAINT "Merch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
