const { DB_ERROR_UNKNOWN_FAILURE, DB_ERROR_ROW_DOES_NOT_EXIST } = require('../../common/constants')
const { LOG_LEVEL_DEBUG, LOG_LEVEL_ERROR, log } = require('../../common/logging')
const { db } = require('../../common/storage')
const unwrapSignInSession = require('./unwrapSignInSession')

async function findSignInSessionByKey (key) {
  const query = db('signInSessions')
    .select('*')
    .where('key', key)
    .limit(1)

  log(LOG_LEVEL_DEBUG, 'auth/storage/findSignInSessionByKey: query', { query: query.toString() })

  let session

  try {
    [session] = await query
    session = (
      (typeof session === 'undefined')
        ? null
        : unwrapSignInSession(session)
    )
  } catch (error) {
    log(LOG_LEVEL_ERROR, 'auth/storage/findSignInSessionByKey: error', { error, stack: error.stack })
    throw DB_ERROR_UNKNOWN_FAILURE
  }

  if (session === null) {
    throw DB_ERROR_ROW_DOES_NOT_EXIST
  }

  return session
}

module.exports = findSignInSessionByKey
