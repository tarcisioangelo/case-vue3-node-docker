import { sign, verify } from 'jsonwebtoken'
import { Service } from 'typedi'

// Types
import { UserSession } from '../../types'
import { UnauthorizedError } from 'express-jwt'

const APP_SECRET = process.env.APP_SECRET || 'sbgwBaX5kJ55T6PbiXpa'
const APP_SECRET_EXPIRES_IN = process.env.APP_SECRET_EXPIRES_IN || '1d'

@Service()
export class JWTUtils {
    constructor() {}

    /**
     * @function
     * @name generate
     * @param userDetails
     * @returns
     */
    async generate(userDetails: UserSession) {
        const token = sign(Object.assign({}, userDetails), APP_SECRET, {
            expiresIn: APP_SECRET_EXPIRES_IN,
        })

        return token
    }

    /**
     * @function
     * @name verify
     * @param token
     */
    verify(token: string): UserSession {
        try {
            if (!token || token === 'undefined') {
                throw new UnauthorizedError('invalid_token', { message: 'Token inválido' })
            }

            token = token.split('Bearer ')[1]

            const result = <UserSession>verify(token, APP_SECRET)

            return result
        } catch (error) {
            if (error.message === 'Token inválido') {
                throw error
            }

            throw new UnauthorizedError('credentials_required', { message: 'Você não tem autorização' })
        }
    }
}
