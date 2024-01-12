-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventDate" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
