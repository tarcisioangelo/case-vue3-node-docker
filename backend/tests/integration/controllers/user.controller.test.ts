import { describe, expect, test } from '@jest/globals'
// import { StatusCodes } from 'http-status-codes';

import { testServer } from '../../jest.setup'

let token = ''
let tokenCsrf = ''
let userID = 0
let email = 'user@test.com'

describe('Usuários', () => {
    it('Criando usuário', async () => {
        const res = await testServer.post('/api/user').send({
            firstName: 'Test',
            lastName: 'Integration',
            email: email,
            password: '123456',
        })

        // Status Code
        expect(res.statusCode).toEqual(201)

        // Type Body
        expect(typeof res.body).toEqual('object')

        // Properties
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
    })

    it('Login', async () => {
        const res = await testServer.post('/api/user/login').send({
            email: email,
            password: '123456',
        })

        // Status Code
        expect(res.statusCode).toEqual(201)

        // Type Body
        expect(typeof res.body).toEqual('object')

        // Properties
        expect(res.body).toHaveProperty('data')

        token = 'Bearer ' + res.body['data']['token']

        userID = Number(res.body['data']['user']['id'])
    })

    it('Listando usuários', async () => {
        const res = await testServer.get('/api/user/list').set('authorization', token)

        // Status Code
        expect(res.statusCode).toEqual(200)

        // Type Body
        expect(typeof res.body).toEqual('object')

        // Properties
        expect(res.body).toHaveProperty('data')
    })

    it('Obtendo token Csrf', async () => {
        const res = await testServer.get('/api/user/csrf-token').set('authorization', token)

        // Status Code
        expect(res.statusCode).toEqual(200)

        // Type Body
        expect(typeof res.body).toEqual('object')

        // Properties
        expect(res.body).toHaveProperty('data')

        tokenCsrf = res.body['data']
    })

    it('Atualizando senha', async () => {
        const res = await testServer.post('/api/user/update-password').set('authorization', token).send({
            password: '123456',
            newPassword: '12345678',
            'x-csrf-token': tokenCsrf,
        })

        // Status Code
        expect(res.statusCode).toEqual(201)

        // Type Body
        expect(typeof res.body).toEqual('object')

        // Properties
        expect(res.body).toHaveProperty('message')
    })

    it('Excluindo usuário pelo ID', async () => {
        const res = await testServer.delete(`/api/user/${userID}`).set('authorization', token)

        // Status Code
        expect(res.statusCode).toEqual(200)

        // Type Body
        expect(typeof res.body).toEqual('object')

        // Properties
        expect(res.body).toHaveProperty('message')
    })
})
