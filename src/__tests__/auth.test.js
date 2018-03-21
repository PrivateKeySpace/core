const request = require('supertest')
const { CORS_ORIGIN } = require('../common/config')
const { refreshDb } = require('../common/storage')
const { generateRandomString } = require('../common/lib/crypto')
const { CHALLENGE_HIDDEN_LENGTH, SESSION_KEY_LENGTH, SIGN_IN_IMPLEMENTATION_TREZOR_V2 } = require('../auth/constants')
const { createSignInSession } = require('../auth/storage')
const app = require('../')

describe('auth e2e', () => {
  beforeEach(async () => {
    await refreshDb()
  })

  describe('POST /auth/signin/start', () => {
    it('should succeed and return 200 with signin session id, visible date challenge and hidden random challenge for valid request', async () => {
      await request(app)
        .post('/auth/signin/start')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect(response => {
          const responsePayload = response.body

          expect(responsePayload).toHaveProperty('sessionKey')
          expect(responsePayload).toHaveProperty('challengeVisible')
          expect(responsePayload).toHaveProperty('challengeHidden')

          expect(typeof responsePayload.sessionKey).toBe('string')
          expect(typeof responsePayload.challengeVisible).toBe('string')
          expect(typeof responsePayload.challengeHidden).toBe('string')

          expect(responsePayload.sessionKey).toHaveLength(SESSION_KEY_LENGTH)
          expect(responsePayload.challengeVisible).toHaveLength(29) // UTC string length
          expect(responsePayload.challengeHidden).toHaveLength(CHALLENGE_HIDDEN_LENGTH * 2) // hex string length is byte length * 2
        })
    })
  })

  describe('POST /auth/signin/complete', () => {
    it('should succeed and return 200 with token for valid request with existing signin session id, proper signature, public key and implementation', async () => {
      const challengeVisual = '2015-03-23 17:39:22'
      const challengeHidden = 'cd8552569d6e4509266ef137584d1e62c7579b5b8ed69bbafa4b864c6521e7c2'
      const publicKey = '023a472219ad3327b07c18273717bb3a40b39b743756bf287fbd5fa9d263237f45'
      const signature = '20f2d1a42d08c3a362be49275c3ffeeaa415fc040971985548b9f910812237bb41770bf2c8d488428799fbb7e52c11f1a3404011375e4080e077e0e42ab7a5ba02'
      const implementation = SIGN_IN_IMPLEMENTATION_TREZOR_V2

      const sessionKey = generateRandomString(SESSION_KEY_LENGTH)
      const challenge = [challengeVisual, challengeHidden]
      const sessionData = { key: sessionKey, challenge }

      await createSignInSession(sessionData)

      const requestPayload = { sessionKey, signature, publicKey, implementation }

      await request(app)
        .post('/auth/signin/complete')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send(requestPayload)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect(response => {
          const responsePayload = response.body

          expect(responsePayload).toHaveProperty('token')
          expect(typeof responsePayload.token).toBe('string')
        })
    })
  })
})
