import axios from 'axios'
import ServiceStorage from './storage'

let baseUrl = import.meta.env.VITE_API_URL

export const getHeaders = (params = {}) => {
    const token = ServiceStorage.getToken()

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token ? 'Bearer '.concat(token) : '',
        },
        params,
        timeout: 60000,
    }

    return config
}

const success = (response: any) => {
    if (response.data.error) {
        return Promise.reject(response.data)
    }

    return response.data
}

const error = (error: any) => {
    if (error.response.status === 401) {
        return Promise.reject(error.response.data)
    }

    if (error.response.status === 500) {
        return Promise.reject(error.response.data)
    }

    return Promise.reject(error.response.data)
}

const api = axios.create({
    baseURL: baseUrl,
})

api.interceptors.response.use(success, error)

export { api }
