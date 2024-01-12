-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "profileId" INTEGER;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
