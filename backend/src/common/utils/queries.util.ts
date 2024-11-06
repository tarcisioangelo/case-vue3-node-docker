import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'

type IService = PrismaService

export const executeQuery = async (sql: Prisma.Sql, db: IService, unique = false) => {
    try {
        const find: any[] = await db.$queryRaw(sql)

        if (find.length > 0) {
            return unique ? find[0] : find
        }

        return unique ? null : []
    } catch (error) {
        console.error(error)
        return unique ? null : []
    }
}
