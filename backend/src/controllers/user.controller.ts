import { Service } from 'typedi'
import {
    Body,
    Get,
    Post,
    JsonController,
    Authorized,
    Delete,
    Param,
    CurrentUser,
    HttpCode,
    Res,
    Req,
} from 'routing-controllers'

// DTOs
import { dtoCreateUser, dtoUpdatePasswordUser, dtoUserLogin } from '../common/validators'

// Services
import { ServiceUser } from '../services'
import { UserSession } from '../types'
import { Request, Response } from 'express'

@JsonController('/api/user')
@Service()
export class UserController {
    constructor(private serviceUser: ServiceUser) {}

    @Get('/list')
    @Authorized()
    async list() {
        try {
            const data = await this.serviceUser.list()

            return { data }
        } catch (error: any) {
            logging.error(error.message)
            throw error
        }
    }

    @Post('')
    @HttpCode(201)
    async create(@Body({ validate: true }) payload: dtoCreateUser) {
        try {
            const data = await this.serviceUser.create(payload)

            return { message: 'Salvo com sucesso', data }
        } catch (error: any) {
            logging.error(error.message)
            throw error
        }
    }

    @Post('/update-password')
    @Authorized()
    @HttpCode(201)
    async updatePassword(@CurrentUser() user: UserSession, @Body({ validate: true }) payload: dtoUpdatePasswordUser) {
        try {
            await this.serviceUser.updatePassword(user, payload)

            return { message: 'Senha atualizada com sucesso' }
        } catch (error) {
            logging.error(error.message)
            throw error
        }
    }

    @Post('/login')
    @HttpCode(201)
    async login(@Body({ validate: true }) user: dtoUserLogin) {
        try {
            const data = await this.serviceUser.login(user.email, user.password)

            return { data }
        } catch (error) {
            logging.error(error.message)
            throw error
        }
    }

    @Delete('/:id')
    @Authorized()
    async delete(@Param('id') id: number) {
        try {
            await this.serviceUser.delete(id)

            return { message: 'Usuário excluído com sucesso' }
        } catch (error) {
            logging.error(error.message)
            throw error
        }
    }

    @Get('/csrf-token')
    @Authorized()
    async csrfToken() {
        try {
            const data = await this.serviceUser.csrfToken()

            return { data }
        } catch (error) {
            logging.error(error.message)
            throw error
        }
    }
}
