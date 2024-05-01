import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.organization).toEqual(
      expect.objectContaining({
        email: 'john@doe.com',
      }),
    )
  })
})
