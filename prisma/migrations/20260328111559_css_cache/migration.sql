-- CreateTable
CREATE TABLE "CSS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "css" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CSS_id_key" ON "CSS"("id");

-- CreateIndex
CREATE INDEX "CSS_css_idx" ON "CSS"("css");
