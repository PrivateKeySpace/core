const { DB_ERROR_UNKNOWN_FAILURE, DB_ERROR_ROW_DOES_NOT_EXIST } = require('../../common/constants')
const { LOG_LEVEL_DEBUG, LOG_LEVEL_ERROR, log } = require('../../common/logging')
const { db } = require('../../common/storage')
const unwrapProfile = require('./unwrapProfile')

async function updateProfileByPivotHashId (pivotHashId, data) {
  const query = db('profiles')
    .where('pivotHashId', pivotHashId)
    .update(data)
    .limit(1)
    .returning('*')

  log(LOG_LEVEL_DEBUG, 'profile/storage/updateProfileByPivotHashId: query', { query: query.toString() })

  let profile

  try {
    [profile] = await query
    profile = (
      (typeof profile === 'undefined')
        ? null
        : unwrapProfile(profile)
    )
  } catch (error) {
    log(LOG_LEVEL_ERROR, 'profile/storage/updateProfileByPivotHashId: error', { error, stack: error.stack })
    throw DB_ERROR_UNKNOWN_FAILURE
  }

  if (profile === null) {
    throw DB_ERROR_ROW_DOES_NOT_EXIST
  }

  return profile
}

module.exports = updateProfileByPivotHashId
