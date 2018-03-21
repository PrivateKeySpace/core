const { CORS_ORIGIN } = require('../config')

function createOptionsHandler (...allowedMethods) {
  async function handleOptions (ctx) {
    const allowedMethodsString = allowedMethods.map(method => method.toUpperCase()).join(', ')

    ctx.response.status = 200
    ctx.response.type = 'text/plain; charset=utf-8'
    ctx.response.set('Access-Control-Allow-Origin', CORS_ORIGIN)
    ctx.response.set('Access-Control-Request-Headers', 'Content-Type, X-Authorization')
    ctx.response.set('Allow', `OPTIONS, ${allowedMethodsString}`)
    ctx.response.set('Accept', 'application/json; charset=utf-8')
    ctx.response.body = ''
  }
  return handleOptions
}

module.exports = createOptionsHandler
