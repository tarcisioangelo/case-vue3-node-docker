import { sign, verify } from 'jsonwebtoken'
import { Service } from 'typedi'

// Types
import { UnauthorizedError } from 'express-jwt'

const CSRF_SECRET = process.env.CSRF_SECRET || 'sbgHBaX2kJ55g6Pb1Xpk'
const CSRF_SECRET_EXPIRES_IN = process.env.CSRF_SECRET_EXPIRES_IN || '10min'

@Service()
export class CrsfUtils {
    constructor() {}

    /**
     * @function
     * @name generate
     * @param userDetails
     * @returns
     */
    async generateToken(): Promise<string> {
        const token = sign({}, CSRF_SECRET, {
            expiresIn: CSRF_SECRET_EXPIRES_IN,
        })

        return token
    }

    /**
     * @function
     * @name verify
     * @param token
     */
    verifyToken(csrfToken: string): boolean {
        try {
            if (!csrfToken || csrfToken === 'undefined') {
                throw new UnauthorizedError('invalid_token', { message: 'csrf inválido' })
            }

            verify(csrfToken, CSRF_SECRET)

            return true
        } catch (error) {
            if (error.message === 'csrf inválido') {
                throw error
            }

            throw new UnauthorizedError('credentials_required', { message: 'Os dados não podem ser salvos' })
        }
    }
}
