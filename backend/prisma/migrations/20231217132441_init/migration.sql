-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Profile_id_seq";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Users_id_seq";
