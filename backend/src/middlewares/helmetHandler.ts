import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { RequestHandler } from 'express'
import { Service } from 'typedi'
import helmet from 'helmet'

@Middleware({ type: 'before' })
@Service()
export class HelmetMiddleware implements ExpressMiddlewareInterface {
    private readonly handler: RequestHandler = helmet()
    public use(request: any, response: any, next: (err: any) => any): void {
        this.handler(request, response, next)
    }
}
