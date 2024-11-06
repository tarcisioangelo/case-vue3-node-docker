export interface IUser {
    id?: number
    firstName: string
    lastName: string
    email: string
}

export interface IUserPayload extends IUser {
    password?: string
    passwordConfirm?: string
}
