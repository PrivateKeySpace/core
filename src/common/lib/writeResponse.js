function writeResponse (ctx, status, body = {}) {
  ctx.response.status = status
  ctx.response.type = 'application/json; charset=utf-8'
  ctx.response.body = JSON.stringify(body)
}

module.exports = writeResponse
