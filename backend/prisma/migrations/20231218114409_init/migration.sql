-- CreateTable
CREATE TABLE "Merch" (
    "id" INTEGER NOT NULL,
    "merchName" TEXT NOT NULL,
    "merchType" TEXT NOT NULL,
    "merchCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Merch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" INTEGER NOT NULL,
    "ticketName" TEXT NOT NULL,
    "ticketType" TEXT NOT NULL,
    "ticketCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);
