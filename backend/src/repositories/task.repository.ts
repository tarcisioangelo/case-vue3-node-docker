import { Prisma } from '@prisma/client'
import { Service } from 'typedi'

// Services
import { PrismaService } from '../prisma/prisma.service'

// Types
import { TaskListItem, Task, TaskCreate, TaskUpdate } from '../types'

// Utils
import { dateFormatSave, executeQuery } from '../common/utils'
import { CustomError } from '../common/errors/handler.error'

@Service()
export class TaskRepository {
    constructor(private db: PrismaService) {}

    /**
     * @function
     * @name getByID
     * @param id number
     * @returns Task || null
     */
    async getByID(id: number): Promise<Task | null> {
        return await this.db.tasks.findUnique({
            where: { id },
        })
    }

    /**
     * @function
     * @name list
     * @returns TaskListItem[]
     */
    async list(idUser: number): Promise<TaskListItem[]> {
        let queryPay = Prisma.sql`
            SELECT 
                a.id
                , a.description
                , TO_CHAR(a.task_date, 'dd/mm/yyyy') as date
                , TO_CHAR(a.task_date, 'HH24:MI') as time
                , task_status as "stTask"
            FROM tb_tasks a
            WHERE a.id_user = ${idUser}
        `

        const data: TaskListItem[] = await executeQuery(queryPay, this.db)

        return data
    }

    /**
     * @function
     * @name create
     * @param dtoCreateTask
     * @returns TaskListItem
     */
    async create(payload: TaskCreate): Promise<TaskListItem> {
        let { idUser, description, dateTask, stTask } = payload

        const dateFormatted = await dateFormatSave(dateTask)

        return await this.db.tasks.create({
            data: { idUser, description, dateTask: dateFormatted, stTask },
        })
    }

    /**
     * @function
     * @name update
     * @param dtoCreateTask
     * @returns TaskListItem
     */
    async update(payload: TaskUpdate): Promise<TaskListItem> {
        let { id, idUser, description, dateTask, stTask } = payload

        const findTask = await this.db.tasks.findUnique({ where: { id: id } })

        if (!findTask) {
            throw new CustomError('Tarefa não encontrada', 400)
        }

        const dateFormatted = await dateFormatSave(dateTask)

        return await this.db.tasks.update({
            where: { id },
            data: { idUser, description, dateTask: dateFormatted, stTask },
        })
    }

    /**
     * @function
     * @name delete
     * @param idUser
     * @param id
     */
    async delete(idUser: number, id: number) {
        const find = await this.getByID(id)

        if (!find) {
            throw new CustomError(`Tarefa não encontrado!`, 400)
        }

        await this.db.tasks.delete({ where: { id, idUser } })
    }
}
