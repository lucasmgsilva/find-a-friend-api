import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(
    app: FastifyInstance,
) {
    await prisma.organization.create({
        data: {
            responsible_name: "John Doe",
            email: "john@doe.com",
            address: "Groove Street",
            number: "123",
            neighborhood: "Santos",
            cep: "12345-321",
            city: "São Paulo",
            state: "SP",
            whatsApp: "(11) 99999-9999",
            password_hash: await hash("123456", 6),
        },
    })

    const authResponse = await request(app.server).post('/sessions').send({
        email: 'john@doe.com',
        password: '123456',
    })

    const { token } = authResponse.body

    return {
        token,
    }
}
