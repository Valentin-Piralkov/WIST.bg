/*
  Warnings:

  - Made the column `categoryId` on table `FilterOption` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FilterOption" ALTER COLUMN "categoryId" SET NOT NULL;
