import type { IUser } from '@/modules/register/types'

export interface IAuthResponse {
    token: string
    user: IUser
}
export interface IAuthUser {
    email: string
    password: string
}
