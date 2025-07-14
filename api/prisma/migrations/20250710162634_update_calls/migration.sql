/*
  Warnings:

  - Added the required column `description` to the `calls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `calls` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_calls" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "callServiceId" TEXT NOT NULL,
    CONSTRAINT "calls_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "calls_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_calls" ("callServiceId", "client_id", "created_at", "id", "status", "technician_id", "updated_at") SELECT "callServiceId", "client_id", "created_at", "id", "status", "technician_id", "updated_at" FROM "calls";
DROP TABLE "calls";
ALTER TABLE "new_calls" RENAME TO "calls";
CREATE UNIQUE INDEX "calls_callServiceId_key" ON "calls"("callServiceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
