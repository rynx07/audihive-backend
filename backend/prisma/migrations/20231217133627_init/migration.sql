-- AlterTable
CREATE SEQUENCE profile_id_seq;
ALTER TABLE "Profile" ALTER COLUMN "id" SET DEFAULT nextval('profile_id_seq');
ALTER SEQUENCE profile_id_seq OWNED BY "Profile"."id";

-- AlterTable
CREATE SEQUENCE users_id_seq;
ALTER TABLE "Users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY "Users"."id";
