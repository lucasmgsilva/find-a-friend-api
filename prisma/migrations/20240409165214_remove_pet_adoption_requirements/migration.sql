/*
  Warnings:

  - You are about to drop the `adoption_requirements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "adoption_requirements" DROP CONSTRAINT "adoption_requirements_pet_id_fkey";

-- DropTable
DROP TABLE "adoption_requirements";
