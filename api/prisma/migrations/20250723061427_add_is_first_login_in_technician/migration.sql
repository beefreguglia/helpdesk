-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_technicians" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "availability" TEXT NOT NULL,
    "isFirstLogin" BOOLEAN NOT NULL DEFAULT true,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "technicians_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_technicians" ("availability", "created_at", "id", "updated_at", "user_id") SELECT "availability", "created_at", "id", "updated_at", "user_id" FROM "technicians";
DROP TABLE "technicians";
ALTER TABLE "new_technicians" RENAME TO "technicians";
CREATE UNIQUE INDEX "technicians_user_id_key" ON "technicians"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
