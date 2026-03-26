-- CreateTable
CREATE TABLE "Cache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "lastFetched" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cache_key_key" ON "Cache"("key");
