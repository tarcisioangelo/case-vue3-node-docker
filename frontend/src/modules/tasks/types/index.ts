export interface ITaskEdit {
    id?: number
    description: string
    date: string
    time: string
    stTask: ITaskStatus
}

export interface ITask {
    id?: number
    description: string
    dateTask: string
    stTask: ITaskStatus
}

export interface ITaskSave {
    id?: number
    description: string
    dateTask: string
    stTask: ITaskStatus
    'x-csrf-token'?: string
}

export interface ITaskList {
    id: number
    description: string
    date: string
    time: string
    stTask: ITaskStatus
}

export type ITaskStatus = 'A' | 'B'
