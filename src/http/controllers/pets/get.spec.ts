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

  it('should be able to get a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const createPetResponse = await request(app.server).post('/pets')
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

    const { pet } = createPetResponse.body

    const getPetResponse = await request(app.server).get(`/pets/${pet.id}`).
      set('Authorization', `Bearer ${token}`)

    expect(getPetResponse.statusCode).toEqual(200)
    expect(getPetResponse.body.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
      })
    )
  })
})
