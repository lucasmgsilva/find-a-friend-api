/*
  Warnings:

  - You are about to alter the column `state` on the `organizations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(2)`.

*/
-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "state" SET DATA TYPE CHAR(2);
