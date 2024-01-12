-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "post_ID" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "date_posted" TEXT NOT NULL,
    "reacts" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("post_ID")
);
