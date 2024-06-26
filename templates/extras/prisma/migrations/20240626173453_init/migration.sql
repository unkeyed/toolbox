-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "post" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Post_title_idx" ON "Post"("title");
