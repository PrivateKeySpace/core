/* @flow */

const SIGN_IN_SESSION_KEY_LENGTH: number = 64
const SIGN_IN_SESSION_TTL: number = (5 * 60) // 5 minutes, seconds

module.exports = {
  SIGN_IN_SESSION_KEY_LENGTH,
  SIGN_IN_SESSION_TTL
}
