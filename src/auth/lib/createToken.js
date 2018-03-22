/* @flow */

const jwt = require('jsonwebtoken')
const { promisify } = require('bluebird')
const { AUTH_SECRET } = require('../../common/config')

const createJwtToken = promisify(jwt.sign)

async function createToken (payload: Object, ttl: number): Promise<string> {
  return createJwtToken(payload, AUTH_SECRET, { algorithm: 'HS512', expiresIn: ttl })
}

module.exports = createToken
