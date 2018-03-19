const request = require('supertest')
const { CORS_ORIGIN } = require('../common/config')
const app = require('../')

describe('auth e2e', () => {
  describe('POST /auth/signin/start', () => {
    it('should succeed and return 200 with signin session id, visible date challenge and hidden random challenge', async () => {
      await request(app)
        .post('/auth/signin/start')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect(response => {
          expect(response.body).toHaveProperty('sessionId')
          expect(response.body).toHaveProperty('challengeVisible')
          expect(response.body).toHaveProperty('challengeHidden')
        })
    })
  })
})
