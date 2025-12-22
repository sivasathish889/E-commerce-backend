/*
  Warnings:

  - You are about to drop the column `resource` on the `Permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Permission` DROP COLUMN `resource`,
    MODIFY `action` ENUM('READ', 'CREATE', 'UPDATE', 'DELETE', 'ALL') NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `phone` VARCHAR(191) NOT NULL;
