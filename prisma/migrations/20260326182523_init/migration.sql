-- CreateTable
CREATE TABLE "Plugin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authors" JSONB NOT NULL,
    "version" TEXT NOT NULL,
    "restartRequired" TEXT DEFAULT 'none',
    "dependencies" JSONB,
    "fileName" TEXT
);

-- CreateTable
CREATE TABLE "Theme" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "website" TEXT,
    "fileName" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "Plugin_id_key" ON "Plugin"("id");

-- CreateIndex
CREATE INDEX "Plugin_id_name_description_idx" ON "Plugin"("id", "name", "description");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_fileName_key" ON "Theme"("fileName");

-- CreateIndex
CREATE INDEX "Theme_fileName_name_idx" ON "Theme"("fileName", "name");
