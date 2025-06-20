/*
  Warnings:

  - The values [HIGER_MATH] on the enum `Result_subject` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `result` MODIFY `subject` ENUM('BANGLA', 'ENGLISH', 'MATH', 'ICT', 'RELIGION', 'SCIENCE', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'HIGHER_MATH', 'AGRICULTURE', 'ACCOUNTING', 'BUSINESS_STUDIES', 'FINANCE', 'ECONOMICS', 'HISTORY', 'CIVICS', 'GEOGRAPHY', 'LOGIC', 'SOCIOLOGY', 'SOCIAL_WORK', 'PSYCHOLOGY') NOT NULL DEFAULT 'BANGLA';
