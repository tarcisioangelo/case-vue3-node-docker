import { afterAll, describe, expect, test } from '@jest/globals'

import { testServer } from '../../jest.setup'

describe('Application', () => {
    it('Test APP', async () => {
        const res = await testServer.get('/')

        // Status Code
        expect(res.statusCode).toEqual(200)

        // Type Body
        expect(typeof res.body).toEqual('object')

        // Properties
        expect(res.body).toHaveProperty('message')
    })

    it('Test Health Check', async () => {
        const res = await testServer.get('/healthcheck')

        // Status Code
        expect(res.statusCode).toEqual(200)

        // Type Body
        expect(typeof res.body).toEqual('object')

        // Properties
        expect(res.body).toHaveProperty('message')

        // Response
        expect(res.body).toEqual({ message: 'Health Check OK' })
    })

    it('Retornando as configurações', async () => {
        const res = await testServer.get('/config')

        // Status Code
        expect(res.statusCode).toEqual(200)

        // Type Body
        expect(typeof res.body).toEqual('object')

        // Properties
        expect(res.body).toHaveProperty('nodeEnv')
        expect(res.body).toHaveProperty('secret')
        expect(res.body).toHaveProperty('db')
    })
})
