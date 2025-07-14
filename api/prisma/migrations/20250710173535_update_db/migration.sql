/*
  Warnings:

  - You are about to drop the column `service_id` on the `calls` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "call_services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "call_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "price_at_time" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "call_services_call_id_fkey" FOREIGN KEY ("call_id") REFERENCES "calls" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "call_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "calls_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "calls_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_calls" ("client_id", "created_at", "description", "id", "status", "technician_id", "title", "updated_at") SELECT "client_id", "created_at", "description", "id", "status", "technician_id", "title", "updated_at" FROM "calls";
DROP TABLE "calls";
ALTER TABLE "new_calls" RENAME TO "calls";
CREATE TABLE "new_technicians" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "availability" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "technicians_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_technicians" ("availability", "created_at", "id", "updated_at", "user_id") SELECT "availability", "created_at", "id", "updated_at", "user_id" FROM "technicians";
DROP TABLE "technicians";
ALTER TABLE "new_technicians" RENAME TO "technicians";
CREATE UNIQUE INDEX "technicians_user_id_key" ON "technicians"("user_id");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_users" ("avatar_url", "created_at", "email", "id", "name", "password", "role", "updated_at") SELECT "avatar_url", "created_at", "email", "id", "name", "password", "role", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
