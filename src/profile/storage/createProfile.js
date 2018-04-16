const { DB_ERROR_UNKNOWN_FAILURE } = require('../../common/constants')
const { LOG_LEVEL_DEBUG, LOG_LEVEL_ERROR, log } = require('../../common/logging')
const { db } = require('../../common/storage')
const unwrapProfile = require('./unwrapProfile')

async function createProfile (data) {
  const query = db('profiles')
    .insert(data)
    .returning('*')

  log(LOG_LEVEL_DEBUG, 'profile/storage/createProfile: query', { query: query.toString() })

  let profile

  try {
    [profile] = await query
    profile = unwrapProfile(profile)
  } catch (error) {
    log(LOG_LEVEL_ERROR, 'profile/storage/createProfile: error', { error, stack: error.stack })
    throw DB_ERROR_UNKNOWN_FAILURE
  }

  return profile
}

module.exports = createProfile
