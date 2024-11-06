-- CreateTable
CREATE TABLE "tb_users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_tasks" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "task_date" DATE NOT NULL,

    CONSTRAINT "tb_tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_tasks" ADD CONSTRAINT "tb_tasks_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
