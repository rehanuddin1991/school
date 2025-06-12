/*
  Warnings:

  - You are about to drop the column `class` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `student` DROP COLUMN `class`,
    ADD COLUMN `className` ENUM('SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN') NOT NULL DEFAULT 'SIX';
