-- AlterTable
CREATE SEQUENCE posts_post_id_seq;
ALTER TABLE "Posts" ALTER COLUMN "post_ID" SET DEFAULT nextval('posts_post_id_seq');
ALTER SEQUENCE posts_post_id_seq OWNED BY "Posts"."post_ID";
