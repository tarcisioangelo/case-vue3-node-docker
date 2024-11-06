import { Action } from 'routing-controllers'
import { JWTUtils } from '../common/utils/jwt.util'
import { CrsfUtils } from '../common/utils'

export async function currentSessionHendler(action: Action) {
    let token = action.request.headers['authorization']

    if (action.request.method === 'POST') {
        let tokenCsrf = action.request.body['x-csrf-token']

        const serviceCsrf = new CrsfUtils()

        serviceCsrf.verifyToken(tokenCsrf)
    }

    const serviceJwt = new JWTUtils()

    const user = serviceJwt.verify(token)

    return {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
    }
}
