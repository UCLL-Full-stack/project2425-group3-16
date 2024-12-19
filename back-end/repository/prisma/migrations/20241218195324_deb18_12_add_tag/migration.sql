-- CreateTable
CREATE TABLE "Tag" (
    "tagId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagId")
);
