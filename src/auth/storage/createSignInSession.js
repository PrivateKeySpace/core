const { DB_ERROR_UNKNOWN_FAILURE } = require('../../common/constants')
const { LOG_LEVEL_DEBUG, LOG_LEVEL_ERROR, log } = require('../../common/logging')
const { db } = require('../../common/storage')

async function createSignInSession (data) {
  const currentTime = Math.floor(Date.now() / 1000)
  const challengeString = JSON.stringify(data.challenge)
  const dataWithTime = { ...data, challenge: challengeString, createdTime: currentTime }

  const query = db('signInSessions')
    .insert(dataWithTime)
    .returning('*')

  log(LOG_LEVEL_DEBUG, 'auth/storage/createSignInSession: query', { query: query.toString() })

  try {
    await query
  } catch (error) {
    log(LOG_LEVEL_ERROR, 'auth/storage/createSignInSession: error', { error, stack: error.stack })
    throw DB_ERROR_UNKNOWN_FAILURE
  }
}

module.exports = createSignInSession
