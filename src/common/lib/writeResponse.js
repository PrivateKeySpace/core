const { CORS_ORIGIN } = require('../config')

function writeResponse (ctx, status, body = {}) {
  ctx.response.status = status
  ctx.response.type = 'application/json; charset=utf-8'
  ctx.response.set('Access-Control-Allow-Origin', CORS_ORIGIN)
  ctx.response.body = JSON.stringify(body)
}

module.exports = writeResponse
