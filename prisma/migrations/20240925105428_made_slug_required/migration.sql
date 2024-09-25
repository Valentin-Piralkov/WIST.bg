/*
  Warnings:

  - Made the column `slug` on table `Internship` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Internship" ALTER COLUMN "slug" SET NOT NULL;
