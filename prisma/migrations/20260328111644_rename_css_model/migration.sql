/*
  Warnings:

  - You are about to drop the `CSS` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CSS";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Css" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "css" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Css_id_key" ON "Css"("id");

-- CreateIndex
CREATE INDEX "Css_css_idx" ON "Css"("css");
