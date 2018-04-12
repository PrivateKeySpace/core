const { isObject } = require('lodash')

function validateCreateProfilePayload (payload) {
  const errors = {}

  if (!isObject(payload)) {
    errors.payload = 'must be an object'
    return errors
  }

  if (typeof payload.pivotXPublicKey !== 'string') {
    errors.pivotXPublicKey = 'must be a string'
  }

  return errors
}

module.exports = validateCreateProfilePayload
