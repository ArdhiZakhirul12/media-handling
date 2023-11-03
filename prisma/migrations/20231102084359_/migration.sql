-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);
