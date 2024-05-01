import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      responsible_name: "John Doe",
      email: "john@doe.com",
      address: "Groove Street",
      number: "123",
      neighborhood: "Santos",
      cep: "12345-321",
      city: "São Paulo",
      state: "SP",
      whatsApp: "(11) 99999-9999",
      password: "123456",
    })

    expect(response.statusCode).toEqual(201)
  })
})
