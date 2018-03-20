const { DB_ERROR_UNKNOWN_FAILURE } = require('../../common/constants')
const { LOG_LEVEL_DEBUG, LOG_LEVEL_ERROR, log } = require('../../common/logging')
const { db } = require('../../common/storage')
const { generateRandomString } = require('../../common/lib/crypto')
const { SESSION_KEY_LENGTH } = require('../constants')

async function createSignInSessionForChallenge (challenge) {
  const currentTime = Math.floor(Date.now() / 1000)
  const key = generateRandomString(SESSION_KEY_LENGTH)
  const challengeString = JSON.stringify(challenge)
  const data = { key, challenge: challengeString, createdTime: currentTime }

  const query = db('signInSessions')
    .insert(data)
    .returning('*')

  log(LOG_LEVEL_DEBUG, 'app/auth/storage/createSignInSessionForChallenge: query', { query: query.toString() })

  try {
    await query
  } catch (error) {
    log(LOG_LEVEL_ERROR, 'app/auth/storage/createSignInSessionForChallenge: error', { error, stack: error.stack })
    throw DB_ERROR_UNKNOWN_FAILURE
  }

  return key
}

module.exports = createSignInSessionForChallenge
