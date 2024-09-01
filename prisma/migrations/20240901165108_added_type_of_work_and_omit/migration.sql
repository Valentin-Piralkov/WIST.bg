-- CreateEnum
CREATE TYPE "Type" AS ENUM ('REMOTE', 'HYBRID', 'ONSITE');

-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'ONSITE';
