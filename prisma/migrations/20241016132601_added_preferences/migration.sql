/*
  Warnings:

  - A unique constraint covering the columns `[employerPreferencesId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employerPreferencesId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "employerPreferencesId" TEXT NOT NULL,
ADD COLUMN     "industry" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "newPosts" BOOLEAN NOT NULL DEFAULT true,
    "replies" BOOLEAN NOT NULL DEFAULT true,
    "marketing" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployerPreferences" (
    "id" TEXT NOT NULL,
    "newCandidates" BOOLEAN NOT NULL DEFAULT true,
    "payslips" BOOLEAN NOT NULL DEFAULT true,
    "marketing" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployerPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_employerPreferencesId_key" ON "Company"("employerPreferencesId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_employerPreferencesId_fkey" FOREIGN KEY ("employerPreferencesId") REFERENCES "EmployerPreferences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
