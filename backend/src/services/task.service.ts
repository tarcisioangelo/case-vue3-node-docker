import { Service } from 'typedi'

// Repositories
import { TaskRepository } from '../repositories'

// DTOs
import { dtoCreateTask } from '../common/validators'

// Types
import { TaskListItem } from '../types'

// Utils
import { removeScriptInjection } from '../common/utils'

@Service()
export class ServiceTask {
    constructor(private repTask: TaskRepository) {}

    /**
     * @function
     * @name list
     * @returns TaskListItem[]
     */
    async list(idUser: number): Promise<TaskListItem[]> {
        return await this.repTask.list(idUser)
    }

    /**
     * @function
     * @name create
     * @param dtoCreateTask
     * @returns TaskListItem
     */
    async save(idUser: number, payload: dtoCreateTask): Promise<TaskListItem> {
        const dataSave = {
            idUser,
            description: removeScriptInjection(payload.description),
            dateTask: payload.dateTask,
            stTask: payload.stTask,
        }

        if (payload.id) {
            const dataUpdate = { ...dataSave, id: payload.id }

            return await this.repTask.update(dataUpdate)
        } else {
            return await this.repTask.create(dataSave)
        }
    }

    /**
     * @function
     * @name delete
     * @param id
     */
    async delete(idUser: number, id: number) {
        await this.repTask.delete(idUser, id)
    }
}
