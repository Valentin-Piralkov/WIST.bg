/*
  Warnings:

  - The primary key for the `Internship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Internship` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[slug]` on the table `Internship` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Internship" DROP CONSTRAINT "Internship_pkey",
ADD COLUMN     "slug" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Internship_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Internship_slug_key" ON "Internship"("slug");
