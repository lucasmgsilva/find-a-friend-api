/*
  Warnings:

  - You are about to drop the column `whatsapp` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `whatsApp` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "whatsapp",
ADD COLUMN     "whatsApp" CHAR(15) NOT NULL;
