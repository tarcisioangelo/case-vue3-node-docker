import { Service } from 'typedi'
import { dtoCreateUser, dtoUpdatePasswordUser } from '../common/validators/user.validator'
import { User, UserListItem, UserLoginSession, UserSession } from '../types'

// Repositories
import { UserRepository } from '../repositories'

// Utils
import { JWTUtils, PasswordUtils } from '../common/utils'
import { CustomError } from '../common/errors/handler.error'
import { CrsfUtils } from '../common/utils'

@Service()
export class ServiceUser {
    constructor(
        private repUser: UserRepository,
        private servicePass: PasswordUtils,
        private serviceJwt: JWTUtils,
        private serviceCrsf: CrsfUtils
    ) {}

    /**
     * @function
     * @name list
     * @returns UserListItem[]
     */
    async list(): Promise<UserListItem[]> {
        return await this.repUser.list()
    }

    /**
     * @function
     * @name create
     * @param dtoCreateUser
     * @returns User
     */
    async create(payload: dtoCreateUser): Promise<UserListItem> {
        payload.password = await this.servicePass.hashPassword(payload.password)

        return await this.repUser.create(payload)
    }

    /**
     * @function
     * @name updatePassword
     * @param dtoCreateUser
     * @returns User
     */
    async updatePassword(user: UserSession, payload: dtoUpdatePasswordUser): Promise<void> {
        await this.checkPassword(user.email, payload.password)

        const newPassword = await this.servicePass.hashPassword(payload.newPassword)

        await this.repUser.updatePassword(user.id, newPassword)
    }

    /**
     * @function
     * @name login
     * @param email string
     * @param password string
     * @returns UserLoginSession
     */
    async login(email: string, password: string): Promise<UserLoginSession> {
        const userDetails = await this.checkPassword(email, password)

        const userToken = {
            id: userDetails.id,
            firstName: userDetails.firstName,
            email: userDetails.email,
        }

        const token = await this.serviceJwt.generate(userToken)

        const data = {
            token,
            user: {
                id: userDetails.id,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
            },
        }

        return data
    }

    /**
     * @function
     * @name update
     * @param email string
     * @param password string
     * @returns User
     */
    async checkPassword(email: string, password: string): Promise<User> {
        const userDetails = await this.repUser.getByEmail(email)

        if (!userDetails) {
            throw new CustomError('Usuário não está cadastrado', 401)
        }

        const isMatch: boolean = this.servicePass.comparePassword(password, userDetails.password)

        if (!isMatch) {
            throw new CustomError('Usuário ou senha inválidos', 401)
        }

        return userDetails
    }

    /**
     * @function
     * @name delete
     * @param id
     * @returns void
     */
    async delete(id: number) {
        return await this.repUser.delete(id)
    }

    /**
     * @function
     * @name csrfToken
     */
    async csrfToken(): Promise<string> {
        return await this.serviceCrsf.generateToken()
    }
}
