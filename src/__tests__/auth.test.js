const request = require('supertest')
const { CORS_ORIGIN } = require('../common/config')
const { refreshDb } = require('../common/storage')
const { CHALLENGE_HIDDEN_LENGTH, SESSION_KEY_LENGTH } = require('../auth/constants')
const app = require('../')

describe('auth e2e', () => {
  beforeEach(async () => {
    await refreshDb()
  })

  describe('POST /auth/signin/start', () => {
    it('should succeed and return 200 with signin session id, visible date challenge and hidden random challenge', async () => {
      await request(app)
        .post('/auth/signin/start')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect(response => {
          expect(response.body).toHaveProperty('sessionKey')
          expect(response.body).toHaveProperty('challengeVisible')
          expect(response.body).toHaveProperty('challengeHidden')

          expect(typeof response.body.sessionKey).toBe('string')
          expect(typeof response.body.challengeVisible).toBe('string')
          expect(typeof response.body.challengeHidden).toBe('string')

          expect(response.body.sessionKey).toHaveLength(SESSION_KEY_LENGTH)
          expect(response.body.challengeVisible).toHaveLength(29) // UTC string length
          expect(response.body.challengeHidden).toHaveLength(CHALLENGE_HIDDEN_LENGTH * 2) // hex string length is byte length * 2
        })
    })
  })
})
