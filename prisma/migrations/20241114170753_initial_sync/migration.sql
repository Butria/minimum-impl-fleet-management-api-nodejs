-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nid" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "is_minor" BOOLEAN NOT NULL,
    "parent_name" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
