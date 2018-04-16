const { pick } = require('lodash')

const profilePublicFields = [
  'pivotHashId'
]

function serializeProfile (profile) {
  const serializedProfile = pick(profile, profilePublicFields)
  // TODO : include data
  return serializedProfile
}

module.exports = serializeProfile
