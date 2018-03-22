const { DB_ERROR_UNKNOWN_FAILURE } = require('../../common/constants')
const { LOG_LEVEL_DEBUG, LOG_LEVEL_ERROR, log } = require('../../common/logging')
const { db } = require('../../common/storage')

async function deleteExpiredSignInSessions (ttl) {
  const currentTime = Math.floor(Date.now() / 1000)
  const createdTimeMin = (currentTime - ttl)

  const query = db('signInSessions')
    .delete()
    .where('createdTime', '<', createdTimeMin)
    .returning('*')

  log(LOG_LEVEL_DEBUG, 'auth/storage/deleteExpiredSignInSessions: query', { query: query.toString() })

  let removedSessions

  try {
    removedSessions = await query
  } catch (error) {
    log(LOG_LEVEL_ERROR, 'auth/storage/deleteExpiredSignInSessions: error', { error, stack: error.stack })
    throw DB_ERROR_UNKNOWN_FAILURE
  }

  log(LOG_LEVEL_DEBUG, 'auth/storage/deleteExpiredSignInSessions: count', { count: removedSessions.length })
}

module.exports = deleteExpiredSignInSessions
