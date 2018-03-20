const ALLOWED_VERSIONS = [1, 2]

function validateSignInSessionCompletePayload (payload) {
  const errors = {}

  if (payload === null || typeof payload !== 'object') {
    errors.payload = 'must be an object'
    return errors
  }

  if (typeof payload.sessionKey !== 'string') {
    errors.sessionKey = 'must be a string'
  }
  if (typeof payload.publicKey !== 'string') {
    errors.publicKey = 'must be a string'
  }
  if (!Number.isInteger(payload.version)) {
    errors.version = 'must be an integer'
  } else if (!ALLOWED_VERSIONS.includes(payload.version)) {
    errors.version = 'must be 1 or 2'
  }

  return errors
}

module.exports = validateSignInSessionCompletePayload
