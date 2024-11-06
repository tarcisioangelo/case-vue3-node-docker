/*
  Warnings:

  - You are about to drop the column `status` on the `tb_tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tb_tasks" DROP COLUMN "status",
ADD COLUMN     "stTask" TEXT NOT NULL DEFAULT 'task_status';
