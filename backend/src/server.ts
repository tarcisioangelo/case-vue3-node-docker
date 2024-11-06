import 'reflect-metadata'
import { createExpressServer, useContainer } from 'routing-controllers'
import Container from 'typedi'

// Config
import './config/logging'
import 'dotenv/config'

// Middleware
import {
    loggingHandler,
    routeNotFound,
    currentSessionHendler,
    authorizationHandler,
    HttpErrorHandler,
    HelmetMiddleware,
} from './middlewares'

// Controllers
import { AppController, UserController, TasksController } from './controllers'

const PORT = process.env.APP_PORT || 8080

logging.log('Starting Server')
logging.log('----------------------------------------')

useContainer(Container)

const server = createExpressServer({
    validation: true,
    classTransformer: true,
    defaultErrorHandler: false,
    authorizationChecker: authorizationHandler,
    currentUserChecker: currentSessionHendler,
    controllers: [AppController, UserController, TasksController],
    middlewares: [HelmetMiddleware, HttpErrorHandler, loggingHandler, routeNotFound],
    cors: true,
})

if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => {
        logging.log(`Server started on ${PORT}`)
        logging.log('----------------------------------------')
    })
}

export { server }
