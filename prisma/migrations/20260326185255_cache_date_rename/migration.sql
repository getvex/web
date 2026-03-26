/*
  Warnings:

  - You are about to drop the column `lastFetched` on the `Cache` table. All the data in the column will be lost.
  - Added the required column `expires` to the `Cache` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "expires" INTEGER NOT NULL
);
INSERT INTO "new_Cache" ("key") SELECT "key" FROM "Cache";
DROP TABLE "Cache";
ALTER TABLE "new_Cache" RENAME TO "Cache";
CREATE UNIQUE INDEX "Cache_key_key" ON "Cache"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
