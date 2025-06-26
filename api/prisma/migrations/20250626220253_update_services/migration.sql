/*
  Warnings:

  - You are about to drop the column `description` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `services` table. All the data in the column will be lost.
  - Added the required column `title` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_services" ("created_at", "id", "is_active", "price", "updated_at") SELECT "created_at", "id", "is_active", "price", "updated_at" FROM "services";
DROP TABLE "services";
ALTER TABLE "new_services" RENAME TO "services";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
