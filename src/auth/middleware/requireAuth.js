const { get } = require('lodash')
const composeMiddleware = require('koa-compose')
const createJwtMiddleware = require('koa-jwt')
const { AUTH_SECRET } = require('../../common/config')
const { writeResponse } = require('../../common/lib')

const requireAuth = composeMiddleware([
  createJwtMiddleware({
    secret: AUTH_SECRET,
    key: 'tokenPayload',
    tokenKey: 'token',
    passthrough: true
  }),
  async function (ctx, next) {
    const token = get(ctx, 'state.token', null)
    const tokenPayload = get(ctx, 'state.tokenPayload', null)

    if (
      (token === null) ||
      (tokenPayload === null)
    ) {
      writeResponse(ctx, 401, { errors: { token: 'missing or invalid' } })
      return
    }

    await next()
  }
])

module.exports = requireAuth
