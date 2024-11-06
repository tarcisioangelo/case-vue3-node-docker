/*
  Warnings:

  - You are about to drop the column `stTask` on the `tb_tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tb_tasks" DROP COLUMN "stTask",
ADD COLUMN     "task_status" TEXT NOT NULL DEFAULT 'A';
