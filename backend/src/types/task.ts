export type Task = {
    id: number
    description: string
    dateTask: Date
    stTask: string
}

export type TaskListItem = {
    id: number
    description: string
    dateTask: Date
    stTask: string
}

export type TaskCreate = {
    idUser: number
    description: string
    dateTask: string
    stTask: string
}

export type TaskUpdate = {
    id: number
    idUser: number
    description: string
    dateTask: string
    stTask: string
}
