/*
  Warnings:

  - You are about to drop the column `value` on the `call_services` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_call_services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "call_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "call_services_call_id_fkey" FOREIGN KEY ("call_id") REFERENCES "calls" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "call_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_call_services" ("call_id", "created_at", "id", "service_id", "updated_at") SELECT "call_id", "created_at", "id", "service_id", "updated_at" FROM "call_services";
DROP TABLE "call_services";
ALTER TABLE "new_call_services" RENAME TO "call_services";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
