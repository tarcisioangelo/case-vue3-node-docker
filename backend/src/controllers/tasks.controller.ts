import { Body, Get, Post, JsonController, Authorized, CurrentUser, Delete, Param, HttpCode } from 'routing-controllers'
import { Service } from 'typedi'

// Services
import { ServiceTask } from '../services'

// DTOs
import { dtoCreateTask } from '../common/validators'
import { UserSession } from '../types'

@JsonController('/api/tasks')
@Authorized()
@Service()
export class TasksController {
    constructor(private serviceTask: ServiceTask) {}

    @Get('')
    async list(@CurrentUser() user: UserSession) {
        try {
            const data = await this.serviceTask.list(user.id)

            return { data }
        } catch (error) {
            logging.error(error.message)
            throw error
        }
    }

    @Post('')
    @HttpCode(201)
    async save(@CurrentUser() user: UserSession, @Body({ validate: true }) payload: dtoCreateTask) {
        try {
            const data = await this.serviceTask.save(user.id, payload)

            return { message: 'Salvo com sucesso', data }
        } catch (error: any) {
            logging.error(error.message)
            throw error
        }
    }

    @Delete('/:id')
    async delete(@CurrentUser() user: UserSession, @Param('id') id: number) {
        try {
            await this.serviceTask.delete(user.id, id)

            return { message: 'Tarefa excluída com sucesso' }
        } catch (error: any) {
            logging.error(error.message)
            throw error
        }
    }
}
