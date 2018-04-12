const request = require('supertest')
const { CORS_ORIGIN } = require('../common/config')
const { createHashId } = require('../common/lib/crypto')
const { migrateDbRefresh } = require('../common/storage')
const { TOKEN_TTL } = require('../auth/constants')
const { createToken } = require('../auth/lib')
const app = require('../')

describe('profile e2e', () => {
  beforeEach(async () => {
    await migrateDbRefresh()
  })

  describe('OPTIONS /profile', () => {
    it('should fail and return 401 for unauthenticated request', async () => {
      await request(app)
        .options('/profile')
        .expect(401)
        .expect('Content-Type', 'application/json; charset=utf-8')
    })

    it('should succeed and return 200 with proper headers and empty body for authenticated request', async () => {
      const authPublicKey = '023a472219ad3327b07c18273717bb3a40b39b743756bf287fbd5fa9d263237f45'
      const authHashId = createHashId(authPublicKey)
      const token = await createToken({ authHashId }, TOKEN_TTL)

      await request(app)
        .options('/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('Allow', 'OPTIONS, GET, POST')
        .expect('Accept', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        .expect('')
    })
  })

  describe('POST /profile', () => {
    it('should fail and return 401 for unauthenticated request', async () => {
      const pivotXPublicKey = '' // TODO
      const requestPayload = { pivotXPublicKey }

      await request(app)
        .options('/profile')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send(requestPayload)
        .expect(401)
        .expect('Content-Type', 'application/json; charset=utf-8')
    })

    it('should succeed and return 201 for requests with valid pivot extended public key for which profile does not exist', async () => {
      const authPublicKey = '023a472219ad3327b07c18273717bb3a40b39b743756bf287fbd5fa9d263237f45'
      const authHashId = createHashId(authPublicKey)
      const token = await createToken({ authHashId }, TOKEN_TTL)

      const pivotXPublicKey = '' // TODO
      const requestPayload = { pivotXPublicKey }

      await request(app)
        .post('/profile')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json; charset=utf-8')
        .send(requestPayload)
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect({})
    })
  })
})
