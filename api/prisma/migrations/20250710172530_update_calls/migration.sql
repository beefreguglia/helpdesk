/*
  Warnings:

  - You are about to drop the `call_services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `callServiceId` on the `calls` table. All the data in the column will be lost.
  - Added the required column `service_id` to the `calls` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "call_services";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_calls" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "client_id" TEXT NOT NULL,
    "technician_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "calls_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "calls_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "calls_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_calls" ("client_id", "created_at", "description", "id", "status", "technician_id", "title", "updated_at") SELECT "client_id", "created_at", "description", "id", "status", "technician_id", "title", "updated_at" FROM "calls";
DROP TABLE "calls";
ALTER TABLE "new_calls" RENAME TO "calls";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
