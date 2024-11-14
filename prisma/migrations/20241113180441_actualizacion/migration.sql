-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nid" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "is_minor" BOOLEAN NOT NULL,
    "parent_name" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);
