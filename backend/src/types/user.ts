export type User = {
    id: number
    firstName: string
    lastName: string
    email: string
    password: string
}

export type UserLogin = {
    email: string
    password: string
}

export type UserLoginSession = {
    token: string
    user: UserListItem
}

export type UserSession = {
    id: number
    firstName: string
    email: string
}

export type UserListItem = {
    id: number
    firstName: string
    lastName: string
    email: string
}

export type UpdatePassword = {
    id: number
    password: string
}
