const request = require('supertest')
const { CORS_ORIGIN } = require('../common/config')
const { migrateDbRefresh } = require('../common/storage')
const { generateRandomString } = require('../common/lib/crypto')
const { CHALLENGE_HIDDEN_LENGTH, SIGN_IN_SESSION_KEY_LENGTH } = require('../auth/constants')
const { createSignInSession } = require('../auth/storage')
const { validSignInData } = require('../auth/lib/verifySignInChallengeSignature/__mocks__/signInData')
const app = require('../')

const [signInData] = validSignInData

describe('auth e2e', () => {
  beforeEach(async () => {
    await migrateDbRefresh()
  })

  describe('OPTIONS /auth/signin/start', () => {
    it('should succeed and return 200 with proper headers and empty body', async () => {
      await request(app)
        .options('/auth/signin/start')
        .expect(200)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('Allow', 'OPTIONS, POST')
        .expect('Accept', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        .expect('')
    })
  })

  describe('POST /auth/signin/start', () => {
    it('should succeed and return 200 with signin session id, visual date challenge and hidden random challenge for valid request', async () => {
      await request(app)
        .post('/auth/signin/start')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect(response => {
          const responsePayload = response.body

          expect(responsePayload).toHaveProperty('sessionKey')
          expect(responsePayload).toHaveProperty('challengeVisual')
          expect(responsePayload).toHaveProperty('challengeHidden')

          expect(typeof responsePayload.sessionKey).toBe('string')
          expect(typeof responsePayload.challengeVisual).toBe('string')
          expect(typeof responsePayload.challengeHidden).toBe('string')

          expect(responsePayload.sessionKey).toHaveLength(SIGN_IN_SESSION_KEY_LENGTH)
          expect(responsePayload.challengeVisual).toHaveLength(29) // UTC string length
          expect(responsePayload.challengeHidden).toHaveLength(CHALLENGE_HIDDEN_LENGTH * 2) // hex string length is byte length * 2
        })
    })
  })

  describe('OPTIONS /auth/signin/complete', () => {
    it('should succeed and return 200 with proper headers and empty body', async () => {
      await request(app)
        .options('/auth/signin/complete')
        .expect(200)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('Allow', 'OPTIONS, POST')
        .expect('Accept', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        .expect('')
    })
  })

  describe('POST /auth/signin/complete', () => {
    it('should succeed and return 200 with token for valid request with existing signin session id, proper signature, public key and implementation', async () => {
      const { publicKey, signature, implementation, challenge: [challengeVisual, challengeHidden] } = signInData

      const sessionKey = generateRandomString(SIGN_IN_SESSION_KEY_LENGTH)
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

    it('should fail and return 404 for request with nonexistent signin session id', async () => {
      const { publicKey, signature, implementation, challenge: [challengeVisual, challengeHidden] } = signInData

      const sessionKey = generateRandomString(SIGN_IN_SESSION_KEY_LENGTH)
      const nonexistentSessionKey = generateRandomString(SIGN_IN_SESSION_KEY_LENGTH)

      const challenge = [challengeVisual, challengeHidden]
      const sessionData = { key: nonexistentSessionKey, challenge }

      await createSignInSession(sessionData)

      const requestPayload = { sessionKey, signature, publicKey, implementation }

      await request(app)
        .post('/auth/signin/complete')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send(requestPayload)
        .expect(404)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect(response => {
          const responsePayload = response.body
          expect(responsePayload).toHaveProperty('errors', { session: 'not found' })
        })
    })

    it('should fail and return 400 for request with invalid payload', async () => {
      const { challenge: [challengeVisual, challengeHidden] } = signInData
      const sessionKey = generateRandomString(SIGN_IN_SESSION_KEY_LENGTH)

      const challenge = [challengeVisual, challengeHidden]
      const sessionData = { key: sessionKey, challenge }

      await createSignInSession(sessionData)

      const requestPayload = {}

      await request(app)
        .post('/auth/signin/complete')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send(requestPayload)
        .expect(400)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect(response => {
          const responsePayload = response.body
          expect(responsePayload).toHaveProperty('errors')
        })
    })
  })
})
