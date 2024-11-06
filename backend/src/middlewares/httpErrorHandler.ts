import { ValidationError } from 'class-validator'
import { UnauthorizedError } from 'express-jwt'
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers'
import { Service } from 'typedi'
import { CustomError } from '../common/errors/handler.error'

export class Response<T> {
    message?: string
    errors: T

    constructor(errors: T, message?: string) {
        if (message) this.message = message
        if (errors) this.errors = errors
    }
}

@Middleware({ type: 'after' })
@Service()
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next: (err: any) => any) {
        if ('errors' in error && error.errors[0] instanceof ValidationError) {
            const errorMessages: { [x: string]: string }[] = findProp(error, 'constraints')

            response.status(400).json(new Response(getValues(errorMessages), 'Dados inválidos'))
        }

        if (error instanceof HttpError) {
            response.status(error.httpCode).json(error)
        } else if (error instanceof UnauthorizedError) {
            response.status(401).json(new Response<null>(null, error.message))
        } else if (error instanceof CustomError) {
            response.status(error.statusCode).json(new Response(null, error.message))
        } else {
            response.status(500).json(new Response(null, 'INTERNAL_SERVER_ERROR'))
        }

        next(error)
    }
}

function findProp(obj: any, key: string, result: any[] = []): any[] {
    const proto = Object.prototype
    const ts = proto.toString
    const hasOwn = proto.hasOwnProperty.bind(obj)

    if ('[object Array]' !== ts.call(result)) {
        result = []
    }

    for (let i in obj) {
        if (hasOwn(i)) {
            if (i === key) {
                result.push(obj[i])
            } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
                findProp(obj[i], key, result)
            }
        }
    }

    return result
}

function getValues(arrayOfObjects: { [x: string]: string }[]): string[] {
    const result: string[] = []

    for (let item of arrayOfObjects) {
        result.push(...Object.values(item))
    }

    return result
}
