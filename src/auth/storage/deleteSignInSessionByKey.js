const { DB_ERROR_UNKNOWN_FAILURE, DB_ERROR_ROW_DOES_NOT_EXIST } = require('../../common/constants')
const { LOG_LEVEL_DEBUG, LOG_LEVEL_ERROR, log } = require('../../common/logging')
const { db } = require('../../common/storage')

async function deleteSignInSessionByKey (key) {
  const query = db('signInSessions')
    .delete()
    .where('key', key)
    .limit(1)
    .returning('*')

  log(LOG_LEVEL_DEBUG, 'auth/storage/deleteSignInSessionByKey: query', { query: query.toString() })

  let session

  try {
    [session] = await query
  } catch (error) {
    log(LOG_LEVEL_ERROR, 'auth/storage/deleteSignInSessionByKey: error', { error, stack: error.stack })
    throw DB_ERROR_UNKNOWN_FAILURE
  }

  if (typeof session === 'undefined') {
    throw DB_ERROR_ROW_DOES_NOT_EXIST
  }
}

module.exports = deleteSignInSessionByKey
