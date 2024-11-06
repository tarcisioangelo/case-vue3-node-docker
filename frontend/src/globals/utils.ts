import ServiceStorage from './storage'

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
