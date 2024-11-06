import { Request, Response, NextFunction } from 'express'

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
    const error = new Error('Not found')

    res.status(404).json({ message: error.message })
}
