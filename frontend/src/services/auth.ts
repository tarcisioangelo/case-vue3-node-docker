import { api, getHeaders } from '@/globals/api'
import type { IAuthResponse, IAuthUser } from '@/modules/auth/types'
import type { IUser, IUserPayload } from '@/modules/register/types'
import type { IPassword } from '@/modules/user/types'

export const apiRegister = async (payload: IUserPayload) => {
    const headers = getHeaders()
    const url = `/user`

    const { data } = await api.post<IUser>(url, payload, headers)

    return data
}

export const apiLogin = async (payload: IAuthUser) => {
    const headers = getHeaders()
    const url = `/user/login`

    const { data } = await api.post<IAuthResponse>(url, payload, headers)

    return data
}

export const apiUpdatePassword = async (payload: IPassword) => {
    const headers = getHeaders()
    const url = `/user/update-password`

    const { data } = await api.post<IPassword>(url, payload, headers)

    return data
}
