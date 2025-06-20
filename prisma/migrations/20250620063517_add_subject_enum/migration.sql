/*
  Warnings:

  - You are about to alter the column `subject` on the `result` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `result` MODIFY `subject` ENUM('BANGLA', 'ENGLISH', 'MATH', 'ICT', 'RELIGION', 'SCIENCE', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'HIGER_MATH', 'AGRICULTURE', 'ACCOUNTING', 'BUSINESS_STUDIES', 'FINANCE', 'ECONOMICS', 'HISTORY', 'CIVICS', 'GEOGRAPHY', 'LOGIC', 'SOCIOLOGY', 'SOCIAL_WORK', 'PSYCHOLOGY') NOT NULL DEFAULT 'BANGLA';
