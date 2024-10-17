/*
  Warnings:

  - A unique constraint covering the columns `[preferencesId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `preferencesId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferencesId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_preferencesId_key" ON "User"("preferencesId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_preferencesId_fkey" FOREIGN KEY ("preferencesId") REFERENCES "Preferences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
