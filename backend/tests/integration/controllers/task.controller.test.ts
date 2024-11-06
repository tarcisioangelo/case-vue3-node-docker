import { describe, expect, test } from '@jest/globals'
// import { StatusCodes } from 'http-status-codes';

import { testServer } from '../../jest.setup'

let token = ''
let tokenCsrf = ''
let userID = 0
let taskID = 0
let email = 'task@test.com'

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

    it('Listando tarefas', async () => {
        const res = await testServer.get('/api/tasks').set('authorization', token)

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

    it('Criando tarefa', async () => {
        const res = await testServer.post('/api/tasks').set('authorization', token).send({
            description: 'Entregar Projeto Hide',
            dateTask: '2024-11-05 10:00',
            stTask: 'A',
            'x-csrf-token': tokenCsrf,
        })

        // Status Code
        expect(res.statusCode).toEqual(201)

        // Type Body
        expect(typeof res.body).toEqual('object')

        // Properties
        expect(res.body).toHaveProperty('message')

        taskID = Number(res.body['data']['id'])
    })

    it('Excluindo tarefa pelo ID', async () => {
        const res = await testServer.delete(`/api/tasks/${taskID}`).set('authorization', token)

        // Status Code
        expect(res.statusCode).toEqual(200)

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
