import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'

@Service()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' },
            ],
            // errorFormat: 'colorless',
            errorFormat: 'minimal',
        })
    }

    async onModuleInit() {
        await this.$connect()
    }
}
