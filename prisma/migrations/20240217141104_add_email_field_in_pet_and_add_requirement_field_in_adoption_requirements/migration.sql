/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requirement` to the `adoption_requirements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoption_requirements" ADD COLUMN     "requirement" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
