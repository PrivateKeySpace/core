const request = require('supertest')
const { CORS_ORIGIN } = require('../common/config')
const app = require('../')

describe('common e2e', () => {
  describe('GET /health', () => {
    it('should succeed and return 200 with empty (JSON object) body', async () => {
      await request(app)
        .get('/health')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Access-Control-Allow-Origin', CORS_ORIGIN)
        .expect('{}')
    })
  })
})
