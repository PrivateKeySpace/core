const { isObject } = require('lodash')
const { SIGN_IN_IMPLEMENTATIONS } = require('../constants')

const SIGN_IN_IMPLEMENTATIONS_STRING = `"${SIGN_IN_IMPLEMENTATIONS.join('", "')}"`

function validateSignInSessionCompletePayload (payload) {
  const errors = {}

  if (!isObject(payload)) {
    errors.payload = 'must be an object'
    return errors
  }

  if (typeof payload.sessionKey !== 'string') {
    errors.sessionKey = 'must be a string'
  }
  if (typeof payload.publicKey !== 'string') {
    errors.publicKey = 'must be a string'
  }
  if (typeof payload.signature !== 'string') {
    errors.signature = 'must be a string'
  }
  if (typeof payload.publicKey !== 'string') {
    errors.implementation = 'must be a string'
  } else if (!SIGN_IN_IMPLEMENTATIONS.includes(payload.implementation)) {
    errors.implementation = `must be one of: ${SIGN_IN_IMPLEMENTATIONS_STRING}`
  }

  return errors
}

module.exports = validateSignInSessionCompletePayload
