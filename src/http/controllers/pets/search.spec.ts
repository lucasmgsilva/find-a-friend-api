import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server).post('/pets')
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

    await request(app.server).post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "Lessie",
        about: "É uma cachorra agitada e arteira",
        age: "YOUNG",
        size: "LARGE",
        energy_level: "HIGH",
        independence_level: "MEDIUM",
        environment: "LARGE"
      })

    const response = await request(app.server).get(`/pets`)
      .query({
        city: "São Paulo",
        age: "YOUNG",
        size: "LARGE",
        energy_level: "HIGH",
        independence_level: "MEDIUM",
        environment: "LARGE",
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual(
      [
        expect.objectContaining({
          name: "Lessie",
        })
      ]
    )
  })
})
