const { DB_ERROR_UNKNOWN_FAILURE, DB_ERROR_ROW_DOES_NOT_EXIST } = require('../../common/constants')
const { LOG_LEVEL_DEBUG, LOG_LEVEL_ERROR, log } = require('../../common/logging')
const { db } = require('../../common/storage')
const unwrapProfile = require('./unwrapProfile')

async function findProfileByAuthHashId (authHashId) {
  console.log(DB_ERROR_UNKNOWN_FAILURE, DB_ERROR_ROW_DOES_NOT_EXIST)
  const query = db('profiles')
    .select('*')
    .where(db.raw('"authHashIds" @> array[?]::varchar[]', authHashId))
    .limit(1)

  log(LOG_LEVEL_DEBUG, 'profile/storage/findProfileByAuthHashId: query', { query: query.toString() })

  let profile

  try {
    [profile] = await query
    profile = (
      (typeof profile === 'undefined')
        ? null
        : unwrapProfile(profile)
    )
  } catch (error) {
    log(LOG_LEVEL_ERROR, 'profile/storage/findProfileByAuthHashId: error', { error, stack: error.stack })
    throw DB_ERROR_UNKNOWN_FAILURE
  }

  if (profile === null) {
    throw DB_ERROR_ROW_DOES_NOT_EXIST
  }

  return profile
}

module.exports = findProfileByAuthHashId
