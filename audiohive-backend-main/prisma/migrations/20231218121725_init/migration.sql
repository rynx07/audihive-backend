-- AlterTable
CREATE SEQUENCE merch_id_seq;
ALTER TABLE "Merch" ALTER COLUMN "id" SET DEFAULT nextval('merch_id_seq');
ALTER SEQUENCE merch_id_seq OWNED BY "Merch"."id";

-- AlterTable
CREATE SEQUENCE tickets_id_seq;
ALTER TABLE "Tickets" ALTER COLUMN "id" SET DEFAULT nextval('tickets_id_seq');
ALTER SEQUENCE tickets_id_seq OWNED BY "Tickets"."id";
