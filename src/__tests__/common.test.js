const request = require('supertest')
const app = require('../')

describe('common e2e', () => {
  describe('GET /health', () => {
    it('should succeed and return 200 with empty (JSON object) body', async () => {
      await request(app)
        .get('/health')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('{}')
    })
  })
})
