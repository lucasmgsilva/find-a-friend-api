import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server).post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "Princesa",
        about: "É uma cachorrinha muito dócil e brincalhona",
        age: "ADULT",
        size: "MEDIUM",
        energy_level: "MEDIUM",
        independence_level: "HIGH",
        environment: "MEDIUM"
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    )
  })
})
