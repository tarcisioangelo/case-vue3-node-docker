import { Request, Response, NextFunction } from 'express'
import { Action } from 'routing-controllers'
import { JWTUtils } from '../common/utils/jwt.util'

export async function authorizationHandler(action: Action) {
    let token = action.request.headers['authorization']

    const serviceJwt = new JWTUtils()

    serviceJwt.verify(token)

    return true
}
