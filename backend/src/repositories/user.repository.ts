import { Service } from 'typedi'
import { PrismaService } from '../prisma/prisma.service'
import { dtoCreateUser } from '../common/validators/user.validator'
import { User, UserListItem } from '../types'
import { CustomError } from '../common/errors/handler.error'

@Service()
export class UserRepository {
    constructor(private db: PrismaService) {}

    /**
     * @function
     * @name getByID
     * @param id number
     * @returns User || null
     */
    async getByID(id: number): Promise<User | null> {
        return await this.db.user.findUnique({
            where: { id },
        })
    }

    /**
     * @function
     * @name getByEmail
     * @param email string
     * @returns User || null
     */
    async getByEmail(email: string): Promise<User | null> {
        return await this.db.user.findFirst({
            where: { email },
        })
    }

    /**
     * @function
     * @name list
     * @returns User[]
     */
    async list(): Promise<UserListItem[]> {
        return await this.db.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
        })
    }

    /**
     * @function
     * @name create
     * @param dtoCreateUser
     * @returns User
     */
    async create(payload: dtoCreateUser): Promise<UserListItem> {
        const { firstName, lastName, email, password } = payload

        const find = await this.getByEmail(email)

        if (find) {
            throw new CustomError(`Já existe um cadastro com o e-mail ${email}`, 400)
        }

        const user = await this.db.user.create({
            data: { firstName, lastName, email, password },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
        })

        return user
    }

    async updatePassword(id: number, password: string): Promise<void> {
        await this.db.user.update({
            where: { id },
            data: { password },
        })
    }

    /**
     * @function
     * @name create
     * @param dtoCreateUser
     * @returns User
     */
    async delete(id: number) {
        const find = await this.getByID(id)

        if (!find) {
            throw new CustomError(`Usuário não encontrado!`, 400)
        }

        await this.db.tasks.deleteMany({ where: { idUser: id } })
        await this.db.user.delete({ where: { id } })
    }
}
