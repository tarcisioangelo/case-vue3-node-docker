import { Get, JsonController } from 'routing-controllers'
import { Service } from 'typedi'

@JsonController('/')
@Service()
export class AppController {
    @Get('')
    deploy() {
        return { message: 'Deploy 06' }
    }

    @Get('healthcheck')
    getHealthCheck() {
        return { message: 'Health Check OK' }
    }

    @Get('config')
    dbCheck() {
        return {
            nodeEnv: `${process.env.NODE_ENV}`,
            secret: `${process.env.APP_SECRET}`,
            db: `${process.env.DATABASE_URL}`,
        }
    }
}
